import Header from './components/Header'
import './App.css'
import CreateAutomationModal from './components/CreateAutomationModal'
import { useEffect, useState } from 'react';
import { loadAutomations } from './api/automations';
import type { AutomationGridItem, KPIData, ScheduledRuns } from './models/automations';
import { Snackbar, Alert } from '@mui/material';
import BaseGrid from './components/BaseGrid';



function App() {
  const [allAutomations, setAllAutomations] = useState<AutomationGridItem[]>([]);
  const [kpi, setKpi] = useState<KPIData | null>(null);
  const [scheduledRuns, setScheduledRuns] = useState<ScheduledRuns | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);



  // Fetch data from backend on component mount
  useEffect(() => {
    loadAutomations({ setLoading, setError, setAllAutomations, setKpi, setScheduledRuns });
  }, []);

  // When successfully created a new automation, refresh the data
  const handleModalSuccess = () => {
    loadAutomations({ setLoading, setError, setAllAutomations, setKpi, setScheduledRuns });
  };

  return (
    <>
      <BaseGrid
        allAutomations={allAutomations}
        kpi={kpi}
        scheduledRuns={scheduledRuns}
        loading={loading}
        onOpenCreateModal={() => setModalOpen(true)}
      />
      <CreateAutomationModal open={modalOpen} onClose={() => setModalOpen(false)} onSuccess={handleModalSuccess} />
      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </>
  )
}

export default App
