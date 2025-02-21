'use client';
import resumeMachine from '@/machines/resumeMachine';
import Control from '@/components/Control';
import ResumeUI from '@/components/Template';
import { useMachine } from '@xstate/react';
import { MachineStoreContext, MachineEmitterContext } from '@/context/machineContexts';
import { Viewport } from 'next';


export const viewPort: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: true
}

export default function Home() {
  const [state, send] = useMachine(resumeMachine)

  return (
    <MachineStoreContext.Provider value={state.context}>
      <ResumeUI mstate={state.value} emit={send} />
      {state.value == 'composingResume' &&
        <MachineEmitterContext.Provider value={send}>
          <Control />
        </MachineEmitterContext.Provider>}
    </MachineStoreContext.Provider>
  );
}
