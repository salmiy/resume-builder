
import { FormEvent, useState } from 'react';
import ImageInput from '../ImageInput';
import Switcher from '../Switcher';
import { useMachineStore, useMachineEmitter } from '@/context/machineContexts';
import { DataScheme } from '@/machines/resumeMachine';
import TextInput from '../Input';

interface Link {
    name: string,
    userId: string,
    url: string,
    icon: string
}


function LinksForm(props: { onSubmit: CallableFunction, })
{
    const [icon, setIcon] = useState("https://i.pinimg.com/736x/93/fd/a4/93fda4257dbfd4412650d51641172782.jpg")
    const [name, setName] = useState('')
    const [userId, setUserId] = useState('')
    const [url, setUrl] = useState('')

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        props.onSubmit({
            name,
            userId,
            url,
            icon
        })
        setIcon("https://i.pinimg.com/736x/93/fd/a4/93fda4257dbfd4412650d51641172782.jpg")
        setName('')
        setUserId('')
        setUrl('')
    }

    return (
        <form id="contact-info-links-form" className="p-4" onSubmit={onSubmit}>
            <div className="flex gap-2 items-center">
                <ImageInput
                    onChange={(url:string) => setIcon(url)}
                    value={icon}
                    className="h-12 w-12 rounded-xl overflow-hidden"
                    optionsClassName='top-[calc(100%+0.5rem)] left-0'
                />
                <TextInput value={name}
                    className='flex-grow'
                    onChange={e => setName(e.target.value)}
                    placeholder="Name"/>
            </div>
            <div className="flex flex-col gap-2">
                <TextInput
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                    placeholder="User Id" />
                <TextInput
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    placeholder="URL" />
                <button className='py-2 bg-[#263f3f] capitalize text-lg text-[#ddd] flex-grow mt-1 rounded-lg'>add</button>
            </div>
        </form>
    )
}

export default function SocialLinks()
{
    const { basics }: DataScheme = useMachineStore()
    const send = useMachineEmitter()

    return (
        <section className="flex flex-col text-black">
            <div className="flex justify-between p-4 items-center">
                <span className="text-xl">Enabled</span>
                <Switcher
                    onChange={(enabled:boolean) => send?.({type: 'links.enabled', value: enabled})} initial={basics.links.enabled} />
            </div>
            <LinksForm onSubmit={(d: Link) => send?.({type: 'link.add', value: d})} />
            <div id="contact-info-links" className="flex flex-col gap-4 p-4">
                {
                    basics.links.data.map((link, idx) => {
                        const border = idx != basics.links.data.length - 1;
                        return  <div key={idx} className={`flex gap-3 items-start ${border && "border-b"} border-[#00000025] pb-3`}>
                            <img className="h-10 w-10 rounded-lg shadow" src={link.icon} />
                            <div className="flex flex-col gap-1">
                                <span>{ link.name }</span>
                                <span>@{ link.userId }</span>
                                <span>{ link.url }</span>
                            </div>
                            <button
                                onClick={() => send?.({type: 'link.delete', value: idx})}
                                className="delete-link self-center ml-auto">
                                <svg fill="red" width="1.5rem" viewBox="0 0 24 24">
                                    <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z" />
                                </svg>
                            </button>
                        </div>
                    })
                }
            </div>
        </section>
    )
}