import { FormEvent, useState } from 'react';
import { useMachineEmitter } from '@/context/machineContexts';
import { HobbyEntry } from '@/machines/types';
import TextInput from '@/components/Input';


export default function HobbyForm({ hobby, onUpdate }: {
    hobby?: HobbyEntry, onUpdate?: () => void }
    | { hobby: HobbyEntry, onUpdate: () => void 
})
{   
    const [name, setName] = useState(hobby?.name ?? '')
    const emit = useMachineEmitter()

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!name) return
        const value = { name }
        setName('')

        if (hobby) {
            emit?.({
                type: 'hobby.update',
                id: hobby.name,
                value
            })
            onUpdate?.()
            return
        }

        emit?.({
            type: 'hobby.add',
            value,
        })
    }
    

    return (
        <form id="contact-info-links-form" className="p-4" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
                <TextInput value={name}
                    className='flex-grow'
                    onChange={e => setName(e.target.value)}
                    placeholder="Hobby" />
                <button
                    className='py-2 bg-[#263f3f50] capitalize text-lg text-[#000] flex-grow mt-1 rounded-full shadow-sm transition-all duration-200 hover:shadow-lg hover:translate-y-[-1px]'
                >{ hobby ? 'update' : 'add' }</button>
            </div>
        </form>
    )
}