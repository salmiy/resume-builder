import { FormEvent, useReducer, useState } from "react";
import Switcher from "../Switcher";
import TextInput from "../Input";
import { AutoResizeTextArea } from "../AutoResizeTextArea";
import ImageInput from "../ImageInput";

type TechnologyEntry = {
    icon: string,
    name: string
}

type ExperienceEntry = {
    position: string,
    company: string,
    location: string,
    startDate: string,
    endDate: string,
    description: string,
    bulletPoints: string[],
    technologies: TechnologyEntry[]
}

type FormState = {
    position: string,
    company: string,
    location: string,
    startDate: string,
    endDate: string,
    description: string
}
type FormReducerEvent = {
    type: 'field.change',
    field: "position" | "company" | "location" | "startDate" | "endDate" | "description",
    value: string
} 
    
function BulletPoints(props: {
    onBulletsChange?: (bullets: string[]) => void
})
{
    const [bulletPoint, setBulletPoint] = useState('')
    const [bulletPoints, setBulletPoints] = useState<string[]>([])

    function onBulletPointAdded(e:FormEvent) {
        e.preventDefault()

        if (!bulletPoint) return

        const bullets = [...bulletPoints, bulletPoint]
        setBulletPoints(bullets);
        setBulletPoint('')
        props?.onBulletsChange?.(bullets)
    }

    return (
        <div className="flex flex-col gap-2 mt-6">
            <h3 className="text-xl font-medium px-4">Bullet Points</h3>
            <form onSubmit={onBulletPointAdded} className="flex gap-2">
                <AutoResizeTextArea
                    value={bulletPoint}
                    onChange={e => setBulletPoint(e.target.value)}
                    className="flex-grow overflow-hidden"
                    placeholder="Point body here..."
                />
                <button
                    className="grid w-10 h-10 p-[.65rem] rounded-lg bg-[#263f3f] stroke-white text-lg mt-auto"
                >
                    <svg viewBox="0 0 10 10">
                        <path d="M1 5H9M5 1V9" strokeLinecap="round"></path>
                    </svg>
                </button>
            </form>
            <ul className="px-3 py-2 pl-8 text-lg list-disc">
                {
                    bulletPoints.map((p, i) => (
                        <li key={i} className="capitalize">{p}</li>
                    ))
                }
            </ul>
        </div>
    )
}

function Technologies(props: {
    onTechnologiesChanged?: (e: TechnologyEntry[]) => void
})
{
    const [icon, setIcon] = useState("https://i.pinimg.com/736x/93/fd/a4/93fda4257dbfd4412650d51641172782.jpg")
    const [name, setName] = useState("")
    const [list, setList] = useState<TechnologyEntry[]>([])

    function onTechnologyAdded(e:FormEvent) {
        e.preventDefault()

        if (!name) return

        const techs = [...list, {name, icon}]
        setList(techs);
        setIcon("https://i.pinimg.com/736x/93/fd/a4/93fda4257dbfd4412650d51641172782.jpg")
        setName("")
        props?.onTechnologiesChanged?.(techs)
    }

    return (
        <div className="flex flex-col gap-2 mt-6">
            <h3 className="text-xl font-medium px-4">Technologies</h3>
            <form className="flex gap-2 pl-2" onSubmit={onTechnologyAdded}>
                <ImageInput
                    className="w-10 h-10 rounded-md overflow-hidden mt-auto flex-shrink-0"
                    optionsClassName="bottom-[100%] -translate-y-2"
                    value={icon}
                    onChange={url => setIcon(url)}
                />
                <TextInput 
                    placeholder="Name"
                    className="flex-grow w-0"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <button
                    className="grid w-10 h-10 p-[.65rem] rounded-lg bg-[#263f3f] stroke-white text-lg mt-auto flex-shrink-0"
                >
                    <svg viewBox="0 0 10 10">
                        <path d="M1 5H9M5 1V9" strokeLinecap="round"></path>
                    </svg>
                </button>
            </form>
            <ul className="flex flex-col gap-2 px-3 py-2 pl-8 text-lg mt-4">
                {
                    list.map((t, i) => (
                        <li key={i} className="flex gap-2 items-start">
                            <img src={t.icon} className="w-8 h-8 rounded-md" />
                            <div className="text-xl capitalize break-words break-all">{ t.name }</div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

function formReducer(state: FormState, action: FormReducerEvent)
{
    switch (action.type) {
        case "field.change":
            state = {
                ...state,
                [action.field]: action.value
            }
            break;
    }
    return state
}

function ExperienceForm() {
    const [state, dispatch] = useReducer(formReducer, {
        position: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: ""
    })

    return (
        <div className="flex flex-col min-h-full pb-8">
            <div className="flex justify-between items-center p-4 sticky top-0 bg-[#eee]">
                <h3 className="section-title text-xl font-medium">Add Experience</h3>
                <button className="bg-[#263f3f] px-4 py-1 rounded-md text-white">Add</button>
            </div>
            <TextInput
                placeholder="Position"
                value={state.position}
                onChange={e => dispatch({
                    type: 'field.change',
                    field: 'position',
                    value: e.target.value
                })} />
            <TextInput
                placeholder="Company"
                value={state.company}
                onChange={e => dispatch({
                    type: 'field.change',
                    field: 'company',
                    value: e.target.value
                })} />
            <TextInput
                placeholder="Location"
                value={state.location}
                onChange={e => dispatch({
                    type: 'field.change',
                    field: 'location',
                    value: e.target.value
                })} />
            <div className="flex gap-2">
                <TextInput
                    className="w-0 flex-grow"
                    placeholder="Start Date"
                    onChange={(e) => console.log(e)} />
                <TextInput
                    className="w-0 flex-grow"
                    placeholder="End Date"
                    onChange={(e) => console.log(e)} />
            </div>
            <AutoResizeTextArea
                value={state.description}
                onChange={e => dispatch({
                    type: 'field.change',
                    field: 'description',
                    value: e.target.value
                })}
                placeholder="Description here..." />
            <BulletPoints />
            <Technologies />
        </div>
    )
}

export default function Experience() {
    const [showForm, setShowForm] = useState(false)

    return (
        <section className='flex flex-col text-[#111] min-h-full'>
            <header className="flex justify-center items-center gap-4 m-4">
                <button
                    className={`text-2xl py-2 px-4 flex-grow basis-0 rounded-full transition-all duration-200 ${showForm ? 'opacity-40 bg-[#bbb]' : 'opacity-100 bg-white'}`}
                    onClick={() => setShowForm(false)}
                >List</button>
                <div className="self-stretch w-[1px] my-3 bg-[#0005] hidden"></div>
                <button
                    className={`text-2xl py-2 px-4 flex-grow basis-0 rounded-full transition-all duration-200 ${showForm ? 'opacity-100 bg-white' : 'opacity-40  bg-[#bbb]'}`}
                    onClick={() => setShowForm(true)}
                >Add</button>
            </header>
            {
                showForm ?
                    <ExperienceForm /> :
                    <div className="flex-flex-col">
                        <div className="flex justify-between items-center px-4">
                            <h3 className="py-2 mt-2 mb-3 text-xl font-medium">Enabled</h3>
                            <Switcher initial={true} onChange={(status: boolean) => console.log(status)} />
                        </div>
                    </div>
            }
        </section>
    )
}