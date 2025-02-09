import { createContext, useContext } from 'react';
import { Actor, AnyStateMachine, StateFrom } from 'xstate';

export const MachineStoreContext = createContext<StateFrom<AnyStateMachine>['context'] | null>(null);
export const MachineEmitterContext = createContext<Actor<AnyStateMachine>['send'] | null>(null);

export function useMachineStore(): StateFrom<AnyStateMachine>['context'] {
    return useContext(MachineStoreContext)
}

export function useMachineEmitter() {
    return useContext(MachineEmitterContext)
}