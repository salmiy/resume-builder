import { FormEvent, useState } from 'react';
import { useMachineEmitter } from '@/context/machineContexts';
import { SocialLinkEntry } from '@/machines/types';
import TextInput from '@/components/Input';
import ImageInput from '@/components/ImageInput';
import { iconBase64 } from '@/components/Control/common/staticData';


export default function SocialLinkForm({ link, onUpdate }: {
    link?: SocialLinkEntry, onUpdate?: () => void }
    | { link: SocialLinkEntry, onUpdate: () => void 
})
{   
    const [icon, setIcon] = useState(link?.icon ?? iconBase64)
    const [name, setName] = useState(link?.name ?? '')
    const [userId, setUserId] = useState(link?.userId ?? '')
    const [url, setUrl] = useState(link?.url ?? '')
    
    const emit = useMachineEmitter()
    

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!name || !userId || !url) return
        const value = { icon, name, userId, url }

        setIcon(iconBase64)
        setName('')
        setUserId('')
        setUrl('')

        if (link) {
            emit({
                type: 'link.update',
                id: link.name,
                value
            })
            onUpdate?.()
        }
        else {
            emit({
                type: 'link.add',
                value
            })
        }
    }
    

    return (
        <form id="contact-info-links-form" className="p-4" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                    <ImageInput
                        onChange={(url:string) => setIcon(url)}
                        key={icon || 'link-icon'}
                        value={icon}
                        className="h-12 w-12 rounded-xl overflow-hidden"
                        optionsClassName='top-[calc(100%+0.5rem)] left-0'
                    />
                    <TextInput value={name}
                        className='flex-grow'
                        onChange={e => setName(e.target.value)}
                        placeholder="Name"/>
                </div>
                <TextInput
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                    placeholder="User Id" />
                <TextInput
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    placeholder="URL" />
                <button
                    className='py-2 bg-[#263f3f50] capitalize text-lg text-[#000] flex-grow mt-1 rounded-full shadow-sm transition-all duration-200 hover:shadow-lg hover:translate-y-[-1px]'
                >{ link ? 'update' : 'add' }</button>
            </div>
        </form>
    )
}