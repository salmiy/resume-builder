import { FormEvent, useState } from 'react';
import Switcher from '../Switcher';
import { useMachineStore, useMachineEmitter } from '@/context/machineContexts';
import { DataScheme, SocialLinkEntry } from '@/machines/types';
import TextInput from '../Input';
import ImageInput from '../ImageInput';


function SocialLinkEntryForm({ link, onUpdate }: {
    link?: SocialLinkEntry, onUpdate?: () => void }
    | { link: SocialLinkEntry, onUpdate: () => void 
})
{   
    const [icon, setIcon] = useState(link?.icon ?? "https://i.pinimg.com/736x/93/fd/a4/93fda4257dbfd4412650d51641172782.jpg")
    const [name, setName] = useState(link?.name ?? '')
    const [userId, setUserId] = useState(link?.userId ?? '')
    const [url, setUrl] = useState(link?.url ?? '')
    
    const emit = useMachineEmitter()
    

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!name || !userId || !url) return
        const value = { icon, name, userId, url }

        setIcon("https://i.pinimg.com/736x/93/fd/a4/93fda4257dbfd4412650d51641172782.jpg")
        setName('')
        setUserId('')
        setUrl('')

        const type = link ? 'link.update' : 'link.add'
        const payload = link ? { id: link.name } : {}

        emit?.({ type, value, ...payload })
        link && onUpdate?.()
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

function SocialLinkEntryCard({ link, onEdit, onDelete }: {
    link: SocialLinkEntry,
    onEdit?: () => void,
    onDelete?: () => void
}) {
    const emit = useMachineEmitter()
    return (
        <section className="flex flex-col gap-2 p-3 bg-white rounded-lg shadow-md">
            <header className="flex justify-between items-start">
                <div className="flex gap-3 items-center">
                    <img className="h-10 w-10 rounded-lg shadow" src={link.icon} />
                    <h2 className="text-xl font-medium">{link.name}</h2>
                </div>
                <Switcher
                    initial={link.enabled}
                    onChange={enabled => emit?.({type:'link.update', id: link.name, value: {enabled}})}
                    size="sm"
                />
            </header>
            <div className='mt-2'>
                <h3 className="text-lg flex gap-2 items-center">
                    <svg viewBox="0 0 24 24" className='h-4 w-4 fill-[#333]'>
                        <path d="M4.49998,12 C4.49998,7.85786 7.85784,4.5 12,4.5 C17.0506,4.5 19.9167,8.66698 19.5092,12.3343 C19.3971,13.3426 19.108,13.8915 18.8873,14.1835 C18.6266,14.5284 18.1554,14.8542 17.703,14.838 C17.3723,14.8262 17.4712,14.3628 17.4925,14.1493 L17.9926,9.14926 C18.075,8.32495 17.4736,7.58988 16.6493,7.50744 C16.2585,7.46837 15.8879,7.58294 15.5972,7.80208 C14.6374,6.99382 13.3961,6.5 12.0305,6.5 C9.00785,6.5 6.49998,8.94763 6.49998,12 C6.49998,15.0558 9.01843,17.5 12.0377,17.5 C13.167,17.5 14.2392,17.1554 15.1338,16.5541 C15.2968,16.7752 15.491,16.9787 15.7176,17.1581 C16.8264,18.0361 18.3002,18.0269 19.6707,17.3416 C20.0525,17.1508 20.6953,16.7667 21.2805,15.9925 C21.8658,15.2182 22.3267,14.1421 22.4908,12.6657 C23.0834,7.33302 18.9493,1.5 12,1.5 C6.20099,1.5 1.49998,6.20101 1.49998,12 C1.49998,17.799 6.20099,22.5 12,22.5 C13.6736,22.5 15.2598,22.1073 16.6675,21.4078 C17.4094,21.0391 17.7119,20.1388 17.3433,19.3969 C16.9746,18.6551 16.0743,18.3525 15.3324,18.7212 C14.3303,19.2192 13.2001,19.5 12,19.5 C7.85784,19.5 4.49998,16.1421 4.49998,12 Z M9.49998,12 C9.49998,10.6341 10.6349,9.5 12.0305,9.5 C13.639,9.5 14.8381,10.9814 14.5144,12.516 C14.2733,13.6589 13.2333,14.5 12.0377,14.5 C10.6386,14.5 9.49998,13.3625 9.49998,12 Z">
                        </path>
                    </svg>
                    {link.userId}
                </h3>
                <a href={link.url} target='_blank' className="text-lg flex gap-2 items-center">
                    <svg viewBox="0 0 24 24" className='h-4 w-4 fill-[#333]'>
                        <path d="M17.3034,9.52412 L20.4854,12.7061 C22.6333,14.854 22.6333,18.3364 20.4854,20.4843 C18.3375,22.6322 14.8551,22.6322 12.7072,20.4843 L11.6466,19.4236 C11.0608,18.8378 11.0608,17.8881 11.6466,17.3023 C12.2323,16.7165 13.1821,16.7165 13.7679,17.3023 L14.8285,18.363 C15.8048,19.3393 17.3878,19.3393 18.3641,18.363 C19.3404,17.3866 19.3404,15.8037 18.3641,14.8274 L15.1821,11.6454 C14.4572,10.9205 13.3978,10.7339 12.5007,11.0854 C12.3394333,11.1486 12.1888778,11.2154 12.0467815,11.2810889 L11.5834169,11.4976131 C10.9633037,11.7781699 10.4855812,11.8986941 9.87869,11.2919 C9.00659,10.4198 9.2329,9.61462 10.2964,8.88115 C12.4392,7.40338 15.397,7.6177 17.3034,9.52412 Z M11.2929,3.51374 L12.3536,4.57441 C12.9393,5.16019 12.9393,6.10994 12.3536,6.69573 C11.7678,7.28151 10.818,7.28151 10.2322,6.69573 L9.17158,5.63507 C8.19526,4.65875 6.61235,4.65875 5.63604,5.63507 C4.65973,6.61138 4.65973,8.19429 5.63604,9.1706 L8.81802,12.3526 C9.54291,13.0775 10.6023,13.2642 11.4994,12.9126 C11.6606667,12.8494 11.8112222,12.7826444 11.9533185,12.7169852 L12.4166831,12.5004558 C13.0367962,12.2198315 13.5145176,12.0993176 14.1214,12.7062 C14.9935,13.5782 14.7672,14.3834 13.7037,15.1169 C11.5609,16.5946 8.60312,16.3803 6.6967,14.4739 L3.51472,11.2919 C1.36684,9.14404 1.36684,5.66163 3.51472,3.51374 C5.6626,1.36586 9.14501,1.36586 11.2929,3.51374 Z">
                        </path>
                    </svg>
                    { link.url }
                </a>
            </div>
            <div className="flex gap-3 mt-2">
                <button
                    onClick={onEdit}
                    className="group flex items-center gap-2 py-2 pl-3 pr-5 rounded-full text-base bg-[#ddd] font-medium overflow-hidden transition-all duration-300 hover:bg-blue-600 hover:text-white"
                >
                    <svg className="fill-white transition-all duration-300 -translate-x-12 h-5 w-0 group-hover:w-5 group-hover:translate-x-0" viewBox="0 0 24 24" fill="none">
                        <path opacity="0.5" d="M1 12C1 6.81455 1 4.22183 2.61091 2.61091C4.22183 1 6.81455 1 12 1C17.1854 1 19.7782 1 21.3891 2.61091C23 4.22183 23 6.81455 23 12C23 17.1854 23 19.7782 21.3891 21.3891C19.7782 23 17.1854 23 12 23C6.81455 23 4.22183 23 2.61091 21.3891C1 19.7782 1 17.1854 1 12Z" />
                        <path d="M13.9261 14.3018C14.1711 14.1107 14.3933 13.8885 14.8377 13.4441L20.378 7.90374C20.512 7.7698 20.4507 7.53909 20.2717 7.477C19.6178 7.25011 18.767 6.82414 17.9713 6.02835C17.1755 5.23257 16.7495 4.38186 16.5226 3.72788C16.4605 3.54892 16.2298 3.48761 16.0959 3.62156L10.5555 9.16192C10.1111 9.60634 9.88888 9.82854 9.69778 10.0736C9.47235 10.3626 9.27908 10.6753 9.12139 11.0062C8.98771 11.2867 8.88834 11.5848 8.68959 12.181L8.43278 12.9515L8.02443 14.1765L7.64153 15.3252C7.54373 15.6186 7.6201 15.9421 7.8388 16.1608C8.0575 16.3795 8.38099 16.4559 8.67441 16.3581L9.82308 15.9752L11.0481 15.5668L11.8186 15.31L11.8186 15.31C12.4148 15.1113 12.7129 15.0119 12.9934 14.8782C13.3243 14.7205 13.637 14.5273 13.9261 14.3018Z" />
                        <path d="M22.1127 6.16905C23.2952 4.98656 23.2952 3.06936 22.1127 1.88687C20.9302 0.704377 19.013 0.704377 17.8306 1.88687L17.6524 2.06499C17.4806 2.23687 17.4027 2.47695 17.4456 2.7162C17.4726 2.8667 17.5227 3.08674 17.6138 3.3493C17.796 3.87439 18.14 4.56368 18.788 5.21165C19.4359 5.85961 20.1252 6.20364 20.6503 6.38581C20.9129 6.4769 21.1329 6.52697 21.2834 6.55399C21.5227 6.59693 21.7627 6.51905 21.9346 6.34717L22.1127 6.16905Z" />
                    </svg>
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    className="group flex items-center gap-2 py-2 pl-3 pr-5 rounded-full text-base bg-[#ddd] font-medium overflow-hidden transition-all duration-300 hover:bg-red-600 hover:text-white">
                    <svg className="fill-white transition-all duration-300 -translate-x-12 h-5 w-0 group-hover:w-5 group-hover:translate-x-0" viewBox="0 0 24 24" fill="none">
                        <path d="M2.75 6.16667C2.75 5.70644 3.09538 5.33335 3.52143 5.33335L6.18567 5.3329C6.71502 5.31841 7.18202 4.95482 7.36214 4.41691C7.36688 4.40277 7.37232 4.38532 7.39185 4.32203L7.50665 3.94993C7.5769 3.72179 7.6381 3.52303 7.72375 3.34536C8.06209 2.64349 8.68808 2.1561 9.41147 2.03132C9.59457 1.99973 9.78848 1.99987 10.0111 2.00002H13.4891C13.7117 1.99987 13.9056 1.99973 14.0887 2.03132C14.8121 2.1561 15.4381 2.64349 15.7764 3.34536C15.8621 3.52303 15.9233 3.72179 15.9935 3.94993L16.1083 4.32203C16.1279 4.38532 16.1333 4.40277 16.138 4.41691C16.3182 4.95482 16.8778 5.31886 17.4071 5.33335H19.9786C20.4046 5.33335 20.75 5.70644 20.75 6.16667C20.75 6.62691 20.4046 7 19.9786 7H3.52143C3.09538 7 2.75 6.62691 2.75 6.16667Z" />
                        <path opacity="0.5" d="M11.6068 21.9998H12.3937C15.1012 21.9998 16.4549 21.9998 17.3351 21.1366C18.2153 20.2734 18.3054 18.8575 18.4855 16.0256L18.745 11.945C18.8427 10.4085 18.8916 9.6402 18.45 9.15335C18.0084 8.6665 17.2628 8.6665 15.7714 8.6665H8.22905C6.73771 8.6665 5.99204 8.6665 5.55047 9.15335C5.10891 9.6402 5.15777 10.4085 5.25549 11.945L5.515 16.0256C5.6951 18.8575 5.78515 20.2734 6.66534 21.1366C7.54553 21.9998 8.89927 21.9998 11.6068 21.9998Z" />
                    </svg>
                    Delete
                </button>
            </div>
        </section>
    )
}

function SocialLinkEntrysList({ onEdit }: {
    onEdit?: (skill:SocialLinkEntry) => void
})
{
    const { links }: DataScheme = useMachineStore()
    const emit = useMachineEmitter()

    return (
        <div className="flex flex-col gap-3 px-3 pb-12">
            {
                links.data.map((link, i) => (
                    <SocialLinkEntryCard
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

export default function SocialLinkEntrys() {
    const { links }: DataScheme = useMachineStore()
    const send = useMachineEmitter()

    const [editing, setEditing] = useState(false)
    const [link, setLink] = useState<SocialLinkEntry | undefined>();

    return (
        <div>
            <section className={`flex flex-col text-black ${editing?"blur-md":""}`}>
                <header className="flex justify-between p-4 items-center">
                    <h3 className="text-xl font-medium">Enabled</h3>
                    <Switcher
                        onChange={(enabled: boolean) => send?.({ type: 'links.enabled', value: enabled })} 
                        initial={links.enabled}
                    />
                </header>
                <div className='bg-white border border-solid border-gray-300 rounded-xl shadow-md mx-2 mb-4'>
                    <SocialLinkEntryForm />
                </div>
                <SocialLinkEntrysList
                    onEdit={(l:SocialLinkEntry) => { setEditing(true); setLink(l)}}
                />

            </section>

            {/* update skill form modal */}
            <div className={`absolute top-0 left-0 w-full h-full justify-center items-center ${editing?'flex':'hidden'}`}>
                <div className='flex flex-col w-[calc(100%-2rem)] gap-2'>
                    <button
                        onClick={() => { setEditing(false); setLink(undefined); }} 
                        className='px-6 py-2 self-end bg-white border border-solid border-gray-300 rounded-full shadow-sm stroke-black transition-all duration-200 hover:shadow-lg hover:translate-y-[-1px]'>
                        <svg className="w-4" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001"></path>
                        </svg>
                    </button>
                    <div className='bg-white border border-solid border-gray-300 rounded-xl shadow-lg'>
                        <SocialLinkEntryForm
                            key={link?.name}
                            link={link}
                            onUpdate={() => { setEditing(false); setLink(undefined); }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
