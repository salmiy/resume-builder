
import { useMachineStore, useMachineEmitter } from '@/context/machineContexts';
import { DataScheme, LanguageEntry } from '@/machines/types';


import LanguageCard from './Card';

export default function LanguageList({ onEdit }: {
    onEdit?: (Language:LanguageEntry) => void
})
{
    const { languages }: DataScheme = useMachineStore()
    const emit = useMachineEmitter()

    return (
        <div className="flex flex-col gap-3 px-3 pb-12">
            {
                languages.data.map((language, i) => (
                    <LanguageCard
                        key={i}
                        language={language}
                        onEdit={() => onEdit?.(language)}
                        onDelete={() => emit?.({type: 'language.delete', id: language.name})}
                    />
                ))
            }
        </div>
    )
}