
import { useEffect, useRef, useState } from 'react';
import { useMachineStore, useMachineEmitter } from '@/context/machineContexts';
import { DataScheme, SkillEntry } from '@/machines/types';
import SkillsFilter from './Filter';
import SkillCard from './Card';
import { FilterFunction } from './types';


export default function SkillList({ onEdit }: {
    onEdit?: (skill: SkillEntry) => void
}) {
    const { skills }: DataScheme = useMachineStore()
    const [data, setData] = useState(skills.data)
    const filter = useRef<FilterFunction>((d) => d)
    const emit = useMachineEmitter()

    useEffect(() => setData(filter.current(skills.data)), [skills])

    return (
        <div className="flex flex-col gap-3 px-3 pb-12">
            { skills.data.length ? <SkillsFilter onFilterChange={(f) => { filter.current = f; setData(f(skills.data))}} /> : null }
            {
                data.map((skill, i) => (
                    <SkillCard
                        key={i}
                        skill={skill}
                        onEdit={() => onEdit?.(skill)}
                        onDelete={() => emit?.({ type: 'skill.delete', id: skill.name })}
                    />
                ))
            }
        </div>
    )
}