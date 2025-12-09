// src/api/automations.ts
import { apiClient } from './client';

import type {
    AutomationReadResponse,
    AutomationGridItem,
    Schedule,
    KPIData,
    ScheduledRuns
} from '../models/automations';

interface CreateAutomationPayload {
    name: string;
    status: boolean;
    schedule: Schedule;
}

export const fetchAutomations = async () => {
    const response = await apiClient.get<AutomationReadResponse>('automations/');
    return response.data;
};

export const createAutomation = async (payload: CreateAutomationPayload) => {
    const response = await apiClient.post<AutomationGridItem>(
        'automations/create',
        payload
    );
    return response.data;
};

export const loadAutomations = async (setLoading: (loading: boolean) => void, setError: (error: string | null) => void, setAllAutomations: (automations: AutomationGridItem[]) => void, setKpi: (kpi: KPIData | null) => void, setScheduledRuns: (runs: ScheduledRuns | null) => void) => {
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