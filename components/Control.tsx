
import { FormEvent, useState, useRef, ChangeEvent } from 'react';
import RoundImageInput from './RoundImageInput';
import Switcher from './Switcher';
import { useMachineStore, useMachineSend } from '@/context/machineContexts';
import useAutosizeTextArea from '@/hooks/useAutoResizeArea';

interface Link {
    name: string,
    userId: string,
    url: string,
    icon: string
}

export default function Control() {
    const [collapsed, setCollapsed] = useState(false);
    const [shownCat, setShownCat] = useState(null);

    const categories = [
        {
            name: "Contact Info",
            top: -12.25,
            form: <ContactInfo />
        },
        {
            name: "Summary",
            top: -16.25,
            form: <Summary />
        },
        {
            name: "Experience",
            top: -20.25,
            form: <ContactInfo />
        },
        {
            name: "Education",
            top: -24.25,
            form: <ContactInfo />
        },
        {
            name: "Skills",
            top: -28.25,
            form: <ContactInfo />
        },
    ]


    function onCloseHandler() {
        setCollapsed(true)
        setShownCat(null)
    }

    return (
        <div id="control" className={collapsed ? 'collapsed' : ''} >
            <header>
                <button id="open" onClick={() => setCollapsed(false)}>
                    <svg viewBox="0 0 20 20">
                        <path d="M 2 1 L 6 1 C 6.583 1.004 6.997 1.424 7 2 L 7 18 C 6.997 18.594 6.565 19.002 6 19 L 2 19 C 1.412 19.002 1.003 18.588 1 18 L 1 14 C 0.998 13.394 1.337 13.003 2 13 L 18 13 C 18.599 13.002 19.002 13.434 19 14 L 19 18 C 19.001 18.57 18.581 18.996 18 19 L 14 19 C 13.371 19.002 13.002 18.518 13 18 L 13 2 C 13.002 1.436 13.417 0.998 14 1 L 18 1 C 18.564 0.998 19.002 1.418 19 2 L 19 6 C 18.996 6.554 18.553 7.003 18 7 L 2 7 C 1.401 6.997 0.998 6.566 1 6 L 1 2 C 1.003 1.476 1.476 1.004 2 1 Z"></path>
                    </svg>
                </button>
                <button id="back" onClick={() => setShownCat(null)} className={shownCat ? "visible" : "hidden"}>
                    <svg viewBox="0 0 24 24">
                        <path d="M 12 2 L 2 12 L 12 22 M 2 12 L 22 12">
                        </path>
                    </svg>
                </button>
                <div className={`title ${shownCat && 'visible'}`}>{shownCat?.name}</div>
                <button id="close" onClick={onCloseHandler}>
                    <svg viewBox="0 0 24 24">
                        <path d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001">
                        </path>
                    </svg>
                </button>
            </header>

            {
                collapsed ||
                <div className="list-wrapper">
                    <ul className="list">
                        {
                            categories.map((cat, idx) =>
                                <li
                                    key={idx}
                                    className={shownCat && "hidden"}
                                    onClick={() => setShownCat(cat)}
                                    style={{ '--delay': `${idx * .08 + .3}s` }}
                                >
                                    <span>{cat.name}</span>
                                    <div></div>
                                </li>
                            )
                        }
                    </ul>
                </div>
            }
            <div id="content" className={shownCat ? "visible" : ""}>
                <div className="main">
                    {shownCat && shownCat.form}
                </div>
            </div>

        </div>
    )
}

function ContactInfo() {

    const info = useMachineStore()
    const send = useMachineSend()

    function onInputChange(eventType: string, e: ChangeEvent<HTMLInputElement>) {
        send({
            type: eventType,
            value: e.target.value
        })
    }

    return (
        <div className="contact-info column text-222">
            <div className="row justify-between p-1rem align-center">
                <span className="fs-12">Enabled</span>
                <Switcher
                    onChange={(enabled:boolean) => send({type: 'contact-info.enabled', value: enabled})} initial={info.enabled} />
            </div>

            <RoundImageInput
                value={info.data.image}
                className="self-center"
                initial={info.data.image}
                onChange={ (url) => send({type: "image.change", value: url})} />
            <div className="column">
                <input 
                    className="mb-2" 
                    type="text" 
                    name="fullname" 
                    placeholder="Full Name" 
                    value={info.data.name} 
                    onChange={e => onInputChange('name.change', e)} />
                <input 
                    className="mb-2" 
                    type="text" 
                    name="email" 
                    placeholder="Email" 
                    value={info.data.email} 
                    onChange={e => onInputChange('email.change', e)} />
                <input 
                    className="mb-3" 
                    type="text" 
                    name="phone" 
                    placeholder="Phone" 
                    value={info.data.phone} 
                    onChange={e => onInputChange('phone.change', e)} />
            </div>

            <h3 className="section-title mb-3 fs-13">Social Links</h3>
            <LinksForm onSubmit={(d: Link) => send({type: 'link.add', value: d})} />
            <div id="contact-info-links" className="column gap-3">
                {
                    info.data.links.map((link, idx) => 
                        <div key={idx} className="row gap-2 align-start">
                            <img className="h-2 w-2 rounded-05 shadow" src={link.icon} />
                            <div className="column gap-1">
                                <span>{ link.name }</span>
                                <span>@{ link.userId }</span>
                                <span>{ link.url }</span>
                            </div>
                            <button
                                onClick={() => send({type: 'link.delete', index: idx})}
                                className="delete-link self-center">
                                <svg fill="red" width="1.5rem" viewBox="0 0 24 24">
                                    <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z" />
                                </svg>
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
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
    }

    return (
        <form id="contact-info-links-form" onSubmit={onSubmit}>
            <div className="first-row row gap-1">
                <RoundImageInput
                    onChange={(url:string) => setIcon(url)}
                    value={icon}
                    className="s-2 rounded-05" 
                    imgClassName="rounded-05" />
                <input value={name} 
                    onChange={e => setName(e.target.value)}
                    type="text" placeholder="Name" max="30" />
                <input
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                    type="text" placeholder="User Id" />
            </div>
            <div className="row gap-1">
                <input 
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    type="text" placeholder="URL" />
                <button>add</button>
            </div>
        </form>
    )
}
function Summary() {
    const [summary, setSummary] = useState("")
    const taRef = useRef<HTMLTextAreaElement>(null)

    useAutosizeTextArea(taRef.current, summary)

    return (
        <div className="column text-222">
            <div className="row justify-between p-1rem align-center">
                <span className="fs-12">Enabled</span>
                <Switcher onChange={() => { }} initial={true} />
            </div>
            <textarea
                className="mb-1"
                placeholder="Summary goes here"
                ref={taRef}
                value={summary}
                onChange={e => setSummary(e.target.value)}></textarea>
        </div>
    )
}