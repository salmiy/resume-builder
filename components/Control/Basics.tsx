
import { useRef, ChangeEvent } from 'react';
import ImageInput from '../ImageInput';
import Switcher from '../Switcher';
import { useMachineStore, useMachineEmitter } from '@/context/machineContexts';
import useAutosizeTextArea from '@/hooks/useAutoResizeArea';
import { DataScheme } from '@/machines/resumeMachine';
import TextInput from '../Input';
import { AutoResizeTextArea } from '../AutoResizeTextArea';


export default function Basics() {
    const { basics }: DataScheme = useMachineStore()
    const emit = useMachineEmitter()
    const taRef = useRef<HTMLTextAreaElement>(null)

    useAutosizeTextArea(taRef.current, basics.summary.data)

    function onInputChange(field: string, e: ChangeEvent<HTMLInputElement>) {
        emit?.({
            type: 'basics.update',
            field,
            value: e.target.value
        })
    }

    return (
        <div className="contact-info flex flex-col text-[#111] pb-8">
            <ImageInput
                value={basics.image}
                className="w-24 h-24 self-center mt-6 rounded-full overflow-hidden mb-2"
                optionsClassName='top-[100%] left-[50%] translate-x-[-50%]'
                onChange={ (url: string) => emit?.({type: "basics.update", field: 'image', value: url})} />
            
            <div className="flex flex-col gap-2">
                <TextInput 
                    placeholder='Full Name' className='capitalize'
                    value={basics.name} onChange={e => onInputChange('name', e)} />
                <TextInput 
                    placeholder='Email' className='capitalize'
                    value={basics.email} onChange={e => onInputChange('email', e)} />
                <TextInput 
                    placeholder='Phone' className='capitalize'
                    value={basics.phone} onChange={e => onInputChange('phone', e)} />
                <TextInput 
                    placeholder='Address' className='capitalize'
                    value={basics.address} onChange={e => onInputChange('address', e)} />
                <TextInput 
                    placeholder='Title (eg. Software Engineer)' className='capitalize'
                    value={basics.title} onChange={e => onInputChange('title', e)} />
            </div>

            <section className='flex flex-col mt-6'>
                <div className="flex justify-between items-center px-4">
                    <h3 className="py-2 mt-2 mb-3 text-2xl font-semibold">Summary</h3>
                    <Switcher initial={basics.summary.enabled} onChange={(status: boolean) => emit?.({ type: 'summary.enable', value: status})} />
                </div>
                <AutoResizeTextArea
                    placeholder='Summary....'
                    value={basics.summary.data}
                    onChange={e => emit?.({ type: 'summary.update', value: e.target.value })}
                />
            </section>
        </div>
    )
}
