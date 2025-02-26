
import { useState } from 'react';
import Switcher from '@/components/Switcher';
import { useMachineStore, useMachineEmitter } from '@/context/machineContexts';
import { DataScheme, HobbyEntry } from '@/machines/types';

import HobbyForm from './Form';
import HobbyList from './List';

export default function Hobbies() {
    const { hobbies }: DataScheme = useMachineStore()
    const send = useMachineEmitter()

    const [editing, setEditing] = useState(false)
    const [hobby, setHobby] = useState<HobbyEntry | undefined>();

    return (
        <div>
            <section className={`flex flex-col text-black ${editing?"blur-md":""}`}>
                <header className="flex justify-between p-4 items-center">
                    <h3 className="text-xl font-medium">Enabled</h3>
                    <Switcher
                        onChange={(enabled: boolean) => send?.({ type: 'hobbies.enabled', value: enabled })} 
                        initial={hobbies.enabled}
                    />
                </header>
                <div className='bg-white border border-solid border-gray-300 rounded-xl shadow-md mx-2 mb-4'>
                    <HobbyForm />
                </div>
                <HobbyList
                    onEdit={(h:HobbyEntry) => { setEditing(true); setHobby(h)}}
                />
            </section>

            {/* update Hobby form modal */}
            <div className={`absolute top-0 left-0 w-full h-full justify-center items-center ${editing?'flex':'hidden'}`}>
                <div className='flex flex-col w-[calc(100%-2rem)] gap-2'>
                    <button
                        onClick={() => { setEditing(false); setHobby(undefined); }} 
                        className='px-6 py-2 self-end bg-white border border-solid border-gray-300 rounded-full shadow-sm stroke-black transition-all duration-200 hover:shadow-lg hover:translate-y-[-1px]'>
                        <svg className="w-4" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001"></path>
                        </svg>
                    </button>
                    <div className='bg-white border border-solid border-gray-300 rounded-xl shadow-lg'>
                        <HobbyForm
                            key={hobby?.name}
                            hobby={hobby}
                            onUpdate={() => { setEditing(false); setHobby(undefined); }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
