
import { FormEvent, useState } from 'react';
import Switcher from '../Switcher';
import { useMachineStore, useMachineEmitter } from '@/context/machineContexts';
import { DataScheme } from '@/machines/resumeMachine';
import TextInput from '../Input';

interface Skill {
    name: string,
    rating: number
}

function RangeInput() {
    const [value, setValue] = useState(100)

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col">
                <div className="flex flex-col relative p-1">
                    <div className='absolute top-0 left-0 w-full h-full bg-transparent border border-blue-500 rounded-full p-1'>
                        <div
                            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full overflow-hidden"
                            style={{ width: `min(100%, calc(${value}% + ${1 - value/100} * 2rem))`}}
                        >
                            {/* <div className="absolute h-[calc(100%-.5rem)] w-[calc(100%-.5rem)] top-1 left-1 bg-green-200 rounded-full"></div> */}
                        </div>
                    </div>                
                    <input 
                        type='range'
                        value={value}
                        className='range w-full'
                        onChange={e => setValue(parseInt(e.target.value))}
                    />
                </div>
                <div className='ml-auto text-2xl'><strong>{ value / 10}</strong> / 10</div>
            </div>
        </div>
    )
}


function SkillsForm(props: { onSubmit: (s: Skill) => void, })
{
    const [name, setName] = useState('')
    const [rating, setRating] = useState(0)

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        props.onSubmit({
            name,
            rating
        })
        setName('')
        setRating(0)
    }

    return (
        <form id="contact-info-links-form" className="p-4" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
                <TextInput value={name}
                    className='flex-grow'
                    onChange={e => setName(e.target.value)}
                    placeholder="Skill"/>
                <RangeInput />
                <button className='py-2 bg-[#263f3f] capitalize text-lg text-[#ddd] flex-grow mt-1 rounded-lg'>add</button>
            </div>
        </form>
    )
}

export default function Skills()
{
    const { basics }: DataScheme = useMachineStore()
    const send = useMachineEmitter()

    return (
        <section className="flex flex-col text-black">
            <header className="flex justify-between p-4 items-center">
                <span className="text-xl">Enabled</span>
                <Switcher
                    onChange={(enabled:boolean) => send?.({type: 'links.enabled', value: enabled})} initial={basics.links.enabled} />
            </header>
            <SkillsForm onSubmit={(d: Skill) => send?.({type: 'skill.add', value: d})} />
            <div id="contact-info-links" className="flex flex-col gap-4 p-4">
            </div>
        </section>
    )
}