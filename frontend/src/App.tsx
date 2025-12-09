import Header from './components/Header'
import './App.css'
import CreateAutomationModal from './components/CreateAutomationModal'
import { useEffect, useState } from 'react';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
    <Header onOpenModal={() => setModalOpen(true)} />
    <CreateAutomationModal open={modalOpen} onClose={() => setModalOpen(false)} onSuccess={()=>{}}/>
    </>
  )
}

export default App
