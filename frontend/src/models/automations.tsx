export interface KPIData {
  total_number_of_automations: number;
  active_schedules: number;
  success_rate: string;
}

export interface ScheduledRunToday {
  name: string;
  time: string;
}

export interface ScheduledRunYesterday {
  name: string;
  status: string;
}

export interface ScheduledRuns {
  today: ScheduledRunToday[];
  yesterday: ScheduledRunYesterday[];
}

export interface Schedule {
  frequency: string;
  start_date: string;
}

export interface LastRun {
  timestamp: string | null;
  status: boolean | null;
}

export interface AutomationGridItem {
  name: string;
  status: boolean;
  schedule: Schedule;
  last_run: LastRun;
  next_run: string;
}

export interface AutomationReadResponse {
  kpi: KPIData;
  scheduled_runs: ScheduledRuns;
  all_automations: AutomationGridItem[];
}
