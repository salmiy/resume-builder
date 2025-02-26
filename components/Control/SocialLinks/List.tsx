import { useMachineStore, useMachineEmitter } from '@/context/machineContexts';
import { DataScheme, SocialLinkEntry } from '@/machines/types';

import SocialLinkCard from './Card';

interface ListProps {
    onEdit?: (skill:SocialLinkEntry) => void
}

export default function SocialLinkList({ onEdit }: ListProps)
{
    const { links }: DataScheme = useMachineStore()
    const emit = useMachineEmitter()

    return (
        <div className="flex flex-col gap-3 px-3 pb-12">
            {
                links.data.map((link, i) => (
                    <SocialLinkCard
                        key={i}
                        link={link}
                        onEdit={() => onEdit?.(link)}
                        onDelete={() => emit?.({type: 'link.delete', id: link.name})}
                    />
                ))
            }
        </div>
    )
}