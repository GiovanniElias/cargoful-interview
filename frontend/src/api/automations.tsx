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

interface CreateAutomationParams {
    setError: (error: string | null) => void;
    onFormReset?: () => void;
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

export const deleteAutomation = async (automation: Partial<AutomationGridItem>) => {
    console.log('Delete automation called', automation);
    const response = await apiClient.delete(`automations/${automation.id}/delete/`);
    return response.data;
};

export const updateAutomation = async (automation: Partial<AutomationGridItem>) => {
    console.log('Update automation called', automation);
    const response = await apiClient.put<AutomationGridItem>(
        `automations/${automation.id}/update/`,
        automation
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

export const createAutomationWithErrorHandling = async (
    automation: Partial<AutomationGridItem>,
    { setError, onFormReset }: CreateAutomationParams
) => {
    try {
        setError(null);
        
        if (!automation.name || !automation.schedule?.start_date) {
            setError('Name and start date are required.');
            return;
        }

        const response = await postAutomation({
            name: automation.name,
            status: automation.status ?? true,
            schedule: {
                frequency: automation.schedule.frequency,
                start_date: automation.schedule.start_date
            }
        });

        if (onFormReset) onFormReset();
        return response;
    } catch (err: any) {
        console.error(err);
        if (err.response?.data) {
            setError(JSON.stringify(err.response.data));
        } else if (err.message) {
            setError(err.message);
        } else {
            setError('Failed to create automation');
        }
        throw err;
    }
};

export const createAutomation = async (automation: Partial<AutomationGridItem>) => {
    if (!automation.name || !automation.schedule?.start_date) {
        throw new Error('Name and start date are required.');
    }

    const response = await postAutomation({
        name: automation.name,
        status: automation.status ?? true,
        schedule: {
            frequency: automation.schedule.frequency,
            start_date: automation.schedule.start_date
        }
    });

    return response;
};