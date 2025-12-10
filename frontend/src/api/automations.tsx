// src/api/automations.ts
import { apiClient } from './client';

import type {
    AutomationReadResponse,
    AutomationGridItem,
    Schedule,
    KPIData,
    ScheduledRuns
} from '../models/automations';
import dayjs, { Dayjs } from 'dayjs';

interface CreateAutomationPayload {
    name: string;
    status: boolean;
    schedule: Schedule;
}

interface LoadAutomationsParams {
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setAllAutomations: (automations: AutomationGridItem[]) => void;
    setKpi: (kpi: KPIData | null) => void;
    setScheduledRuns: (runs: ScheduledRuns | null) => void;
}

interface FormState {
    name: string;
    status: boolean;
    frequency: string;
    startDate: Dayjs | null;
}

interface FormSetters {
    setName: (name: string) => void;
    setStatus: (status: boolean) => void;
    setFrequency: (frequency: string) => void;
    setStartDate: (date: Dayjs) => void;
}

interface FormHandlers {
    setErrors: (errors: string | null) => void;
    setLoading: (loading: boolean) => void;
    onSuccess?: () => void;
    onClose: () => void;
}

export const fetchAutomations = async () => {
    const response = await apiClient.get<AutomationReadResponse>('automations/');
    return response.data;
};

export const postAutomation = async (payload: CreateAutomationPayload) => {
    const response = await apiClient.post<AutomationGridItem>(
        'automations/create/',
        payload
    );
    return response.data;
};

export const loadAutomations = async ({ setLoading, setError, setAllAutomations, setKpi, setScheduledRuns }: LoadAutomationsParams) => {
    setLoading(true);
    setError(null);
    try {
        const data = await fetchAutomations();
        setAllAutomations(data.all_automations);
        setKpi(data.kpi);
        setScheduledRuns(data.scheduled_runs);
    } catch (err: any) {
        console.error(err);
        setError('Failed to fetch automations');
    } finally {
        setLoading(false);
    }
};



export const createAutomation = async (
    {setErrors, setLoading, onSuccess, onClose}: FormHandlers, 
    {setName, setStatus, setFrequency, setStartDate}: FormSetters,
    {name, status, frequency, startDate}: FormState
) => {
        if (!name || !startDate) {
            setErrors('Name and start date are required');
            return;
        }

        setLoading(true);
        setErrors(null);

        try {
            await postAutomation({
                name,
                status: status,
                schedule: {
                    frequency,
                    start_date: startDate.toISOString()
                }
            });

            if (onSuccess) onSuccess();
            onClose();

            // reset form
            setName('');
            setStatus(true);
            setFrequency('Daily');
            setStartDate(dayjs());
        } catch (err: any) {
            if (err.response) {
                // server returned an error
                if (err.response.data) {
                    setErrors(JSON.stringify(err.response.data));
                } else {
                    setErrors(`Unexpected error: ${err.response.status}`);
                }
            } else {
                setErrors('Network error');
            }
        } finally {
            setLoading(false);
        }
    };