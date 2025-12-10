import Header from './components/Header'
import './App.css'
import CreateAutomationModal from './components/CreateAutomationModal'
import { useEffect, useState } from 'react';
import { loadAutomations } from './api/automations';
import type { AutomationGridItem, KPIData, ScheduledRuns } from './models/automations';



function App() {
  const [allAutomations, setAllAutomations] = useState<AutomationGridItem[]>([]);
  const [kpi, setKpi] = useState<KPIData | null>(null);
  const [scheduledRuns, setScheduledRuns] = useState<ScheduledRuns | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);



  // Fetch data from backend on component mount
  useEffect(() => {
    loadAutomations({setLoading, setError, setAllAutomations, setKpi, setScheduledRuns});
  }, []);

  // When successfully created a new automation, refresh the data
  const handleModalSuccess = () => {
    loadAutomations({setLoading, setError, setAllAutomations, setKpi, setScheduledRuns});
  };
  return (
    <>
      <Header onOpenModal={() => setModalOpen(true)} />
      <CreateAutomationModal open={modalOpen} onClose={() => setModalOpen(false)} onSuccess={handleModalSuccess} />
    </>
  )
}

export default App
