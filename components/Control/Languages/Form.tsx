import { FormEvent, useState } from 'react';
import { useMachineEmitter } from '@/context/machineContexts';
import { LanguageEntry } from '@/machines/types';
import TextInput from '@/components/Input';
import RangeInput from '@/components/RangeInput';

type FormProps = { language?: LanguageEntry, onUpdate?: () => void }
                | { language: LanguageEntry, onUpdate: () => void }

export default function LanguageForm({ language, onUpdate }: FormProps)
{   
    const [name, setName] = useState(language?.name ?? '')
    const [rating, setRating] = useState(language?.rating ?? 10)

    const emit = useMachineEmitter()

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!name) return
        const value = {
            name,
            rating
        }
        setName('')
        setRating(10)
        if (language) {
            emit?.({
                type: 'language.update',
                id: language.name,
                value
            })
            onUpdate?.()
            return
        }

        emit?.({
            type: 'language.add',
            value,
        })
    }
    

    return (
        <form id="contact-info-links-form" className="p-4" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
                <TextInput value={name}
                    className='flex-grow'
                    onChange={e => setName(e.target.value)}
                    placeholder="Language" />
                <RangeInput
                    value={rating}
                    onChange={(val) => setRating(val)}
                />
                <button
                    className='py-2 bg-[#263f3f50] capitalize text-lg text-[#000] flex-grow mt-1 rounded-full shadow-sm transition-all duration-200 hover:shadow-lg hover:translate-y-[-1px]'
                >{ language ? 'update' : 'add' }</button>
            </div>
        </form>
    )
}