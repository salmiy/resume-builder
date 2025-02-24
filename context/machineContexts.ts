import { MachineEmitter, initialContext } from '@/machines/resumeMachine';
import { DataScheme } from '@/machines/types';
import { createContext, useContext } from 'react';

export const MachineStoreContext = createContext<DataScheme>( initialContext );
export const MachineEmitterContext = createContext<MachineEmitter>((e) => {});

export function useMachineStore(): DataScheme
{
    return useContext(MachineStoreContext)
}

export function useMachineEmitter(): MachineEmitter
{
    return useContext(MachineEmitterContext)
}