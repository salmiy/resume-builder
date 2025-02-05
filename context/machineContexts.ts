import { createContext, useContext } from 'react';

export const MachineStoreContext = createContext();
export const MachineSendContext = createContext();

export function useMachineStore() {
    return useContext(MachineStoreContext)
}

export function useMachineSend() {
    return useContext(MachineSendContext)
}