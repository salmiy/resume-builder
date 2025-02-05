'use client';
import contactInfoMachine from '@/machines/contactInfo';
import Control from '@/components/Control';
import ResumeUI from '@/components/ResumeUI';
import { useMachine } from '@xstate/react';
import { MachineStoreContext, MachineSendContext } from '@/context/machineContexts';

export default function Home() {
  const [state, send] = useMachine(contactInfoMachine)
  return (
    <MachineStoreContext.Provider value={state.context}>
        <ResumeUI />
        <MachineSendContext.Provider value={send}>
            <Control />
        </MachineSendContext.Provider>
    </MachineStoreContext.Provider>
  );
}
