import { useState } from 'react';
import Switcher from '@/components/Switcher';
import { useMachineStore, useMachineEmitter } from '@/context/machineContexts';
import { DataScheme, SkillEntry } from '@/machines/types';


import SkillsForm from './Form';
import SkillList from './List';

export default function Skills() {
    const { skills }: DataScheme = useMachineStore()
    const send = useMachineEmitter()

    const [editing, setEditing] = useState(false)
    const [skill, setSkill] = useState<SkillEntry | undefined>();

    return (
        <div>
            <section className={`flex flex-col text-black ${editing ? "blur-md" : ""}`}>
                <header className="flex justify-between p-4 items-center">
                    <h3 className="text-xl font-medium">Enabled</h3>
                    <Switcher
                        onChange={(enabled: boolean) => send?.({ type: 'skills.enabled', value: enabled })}
                        initial={skills.enabled}
                    />
                </header>
                <div className='bg-white border border-solid border-gray-300 rounded-xl shadow-md mx-2 mb-4'>
                    <SkillsForm />
                </div>
                <SkillList
                    onEdit={(s: SkillEntry) => { setEditing(true); setSkill(s) }}
                />

            </section>

            {/* update skill form modal */}
            <div className={`absolute top-0 left-0 w-full h-full justify-center items-center ${editing ? 'flex' : 'hidden'}`}>
                <div className='flex flex-col w-[calc(100%-2rem)] gap-2'>
                    <button
                        onClick={() => { setEditing(false); setSkill(undefined); }}
                        className='px-6 py-2 self-end bg-white border border-solid border-gray-300 rounded-full shadow-sm stroke-black transition-all duration-200 hover:shadow-lg hover:translate-y-[-1px]'>
                        <svg className="w-4" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001"></path>
                        </svg>
                    </button>
                    <div className='bg-white border border-solid border-gray-300 rounded-xl shadow-lg'>
                        <SkillsForm
                            key={skill?.name + "-" + skill?.rating}
                            skill={skill}
                            onUpdate={() => { setEditing(false); setSkill(undefined); }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
