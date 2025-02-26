import { useMachineStore, useMachineEmitter } from '@/context/machineContexts';
import { DataScheme, HobbyEntry } from '@/machines/types';

import HobbyCard from './Card';

export default function HobbyList({ onEdit }: {
    onEdit?: (hobby:HobbyEntry) => void
})
{
    const { hobbies }: DataScheme = useMachineStore()
    const emit = useMachineEmitter()

    return (
        <div className="flex flex-col gap-3 px-3 pb-12">
            {
                hobbies.data.map((hobby, i) => (
                    <HobbyCard
                        key={i}
                        hobby={hobby}
                        onEdit={() => onEdit?.(hobby)}
                        onDelete={() => emit?.({type: 'hobby.delete', id: hobby.name})}
                    />
                ))
            }
        </div>
    )
}