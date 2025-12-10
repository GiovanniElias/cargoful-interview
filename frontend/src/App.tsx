import './App.css'
import CreateAutomationModal from './components/CreateAutomationModal'
import { useEffect, useState } from 'react';
import { loadAutomations } from './api/automations';
import type { AutomationGridItem, KPIData, ScheduledRuns } from './models/automations';
import { Snackbar, Alert } from '@mui/material';
import BaseGrid from './components/BaseGrid';
import ConfirmChangesModal from './components/ConfirmChangesModal';

function App() {
  const [allAutomations, setAllAutomations] = useState<AutomationGridItem[]>([]);
  const [kpi, setKpi] = useState<KPIData | null>(null);
  const [scheduledRuns, setScheduledRuns] = useState<ScheduledRuns | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creationModalOpen, setCreationModalOpen] = useState(false);
  const [confirmChangesModalOpen, setConfirmChangesModalOpen] = useState(false);
  const [applyChangesFunction, setApplyChangesFunction] = useState<((obj: AutomationGridItem) => void) | null>(null);
  const [automationToChange, setAutomationToChange] = useState<AutomationGridItem>();
  const [editingAutomation, setEditingAutomation] = useState<AutomationGridItem | null>(null);

  // Fetch data from backend on component mount
  useEffect(() => {
    loadAutomations({ setLoading, setError, setAllAutomations, setKpi, setScheduledRuns });
  }, []);

  // When successfully created/updated an automation, refresh the data and close modals
  const handleModalSuccess = () => {
    loadAutomations({ setLoading, setError, setAllAutomations, setKpi, setScheduledRuns });
    // Close the CreateAutomationModal if it's open (happens after successful updates)
    if (creationModalOpen) {
      setCreationModalOpen(false);
      setEditingAutomation(null);
    }
  };

  return (
    <>
      <BaseGrid
        allAutomations={allAutomations}
        kpi={kpi}
        scheduledRuns={scheduledRuns}
        onOpenCreateModal={() => {
          setEditingAutomation(null);
          setCreationModalOpen(true);
        }}
        onOpenEditModal={(automation) => {
          setEditingAutomation(automation);
          setCreationModalOpen(true);
        }}
        setApplyChangesFunction={setApplyChangesFunction}
        setAutomationToChange={setAutomationToChange}
        onOpenConfirmChangesModal={() => setConfirmChangesModalOpen(true)}
      />
      <CreateAutomationModal
        open={creationModalOpen}
        onClose={() => {
          setCreationModalOpen(false);
          setEditingAutomation(null);
        }}
        onError={setError}
        setApplyChangesFunction={setApplyChangesFunction}
        setAutomationToChange={setAutomationToChange}
        onOpenConfirmChangesModal={() => setConfirmChangesModalOpen(true)}
        editingAutomation={editingAutomation}
      />
      <ConfirmChangesModal
        open={confirmChangesModalOpen}
        onClose={() => setConfirmChangesModalOpen(false)}
        onSuccess={handleModalSuccess}
        onError={setError}
        applyChangesFunction={applyChangesFunction!}
        automationToChange={automationToChange!}
      />
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
