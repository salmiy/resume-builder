import { useReducer, useState, useRef } from "react";
import { AutoResizeTextArea } from "../AutoResizeTextArea";
import { useMachineEmitter, useMachineStore } from "@/context/machineContexts";
import { DataScheme, TechnologyEntry, ProjectEntry } from "@/machines/types";
import Switcher from "../Switcher";
import TextInput from "../Input";
import BulletPoints from "./common/BulletPoints";
import Technologies from "./common/Technologies";

type FormState = Omit<ProjectEntry, 'bulletPoints'|'technologies'>

type FormReducerEvent = {
    type: 'field.change',
    field: "position" | "company" | "location" | "startDate" | "endDate" | "description",
    value: string
} | { type: 'reset' }

type ProjectExtra = {
    bulletPoints: string[],
    technologies: TechnologyEntry[]
}

function formReducer(state: FormState, action: FormReducerEvent) {
    switch (action.type) {
        case "field.change":
            state = {
                ...state,
                [action.field]: action.value
            }
            break;
        case "reset":
            state = {
                name: "",
                startDate: "",
                endDate: "",
                description: ""
            }
            break;
    }
    return state
}

type FormProps = { showList?: () => void } & (
    { projectIndex?: number, project?: ProjectEntry }
    | { projectIndex: number, project: ProjectEntry } )

function ProjectForm(props: FormProps)
{
    const { bulletPoints, technologies, ...expBasics } = props.project ?? {
        bulletPoints: [], technologies: [],
        name: "",
        location: "", startDate: "",
        endDate: "", description: ""
    }
    const emit = useMachineEmitter()
    const extra = useRef<ProjectExtra>({ bulletPoints, technologies })
    const keys = useRef<[string, string]>(['bullets', 'techs'])
    const [editingProjectIdx, setEditingProjectIdx] = useState(props.projectIndex)
    const [editingMsgDismissed, setEditingMsgDismissed] = useState(props.projectIndex == undefined)
    const [state, dispatch] = useReducer(formReducer, expBasics)

    function onprojectAdded() {
        const value = { ...state, ...extra.current }
        if (editingProjectIdx != undefined)
            emit({
                type: 'project.update',
                index: editingProjectIdx,
                value
            })

        else
            emit?.({
                type: 'project.add',
                value
            })
        clearForm()
        props.showList?.()
    }

    function clearForm() {
        extra.current = { bulletPoints: [], technologies: [] }
        keys.current = [
            keys.current[0] == 'bullets' ? '_bullets_' : 'bullets',
            keys.current[1] == 'techs' ? '_techs_' : 'techs'
        ]
        dispatch({ type: 'reset' })
    }

    return (
        <div className="flex flex-col min-h-full pb-20">
            {editingMsgDismissed ||
                <div className="flex flex-col items-center bg-[#ccc] sticky top-0 font-medium py-1">
                    Editing existing project
                    <div className="flex gap-2">
                        <button
                            onClick={() => { setEditingMsgDismissed(true); setEditingProjectIdx(undefined) }}
                            className="py-1 px-3 bg-white rounded-full transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg"
                        >Switch to <strong>`Create New`</strong></button>
                        <button
                            onClick={() => setEditingMsgDismissed(true)}
                            className="py-1 px-3 bg-white rounded-full transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg"
                        ><strong>dismiss</strong></button>
                    </div>
                </div>
            }
            <div className="flex justify-between items-center p-4">
                <h3 className="section-title text-xl font-medium">Add project</h3>
                <div className="flex gap-2 absolute bottom-4 right-4 z-10">
                    <button
                        onClick={clearForm}
                        className="group relative bg-red-800 fill-red-800 p-3 rounded-full text-white text-base shadow-md"
                    >
                        <svg viewBox="0 0 24 24" className="w-8 h-8">
                            <path d="M6.87114 19.4986C7.80085 20 8.91458 20 11.142 20H13.779C17.6544 20 19.5921 20 20.7961 18.8284C22 17.6569 22 15.7712 22 12C22 8.22876 22 6.34315 20.7961 5.17157C19.5921 4 17.6544 4 13.779 4H11.142C8.91458 4 7.80085 4 6.87114 4.50143C5.94144 5.00286 5.35117 5.92191 4.17061 7.76001L3.48981 8.82001C2.4966 10.3664 2 11.1396 2 12C2 12.8604 2.4966 13.6336 3.48981 15.18L4.17061 16.24C5.35117 18.0781 5.94144 18.9971 6.87114 19.4986Z" fill="#eee" />
                            <path d="M11.0303 8.96967C10.7374 8.67678 10.2626 8.67678 9.96967 8.96967C9.67678 9.26256 9.67678 9.73744 9.96967 10.0303L11.9394 12L9.96969 13.9697C9.6768 14.2626 9.6768 14.7374 9.96969 15.0303C10.2626 15.3232 10.7375 15.3232 11.0304 15.0303L13 13.0607L14.9696 15.0303C15.2625 15.3232 15.7374 15.3232 16.0303 15.0303C16.3232 14.7374 16.3232 14.2625 16.0303 13.9697L14.0607 12L16.0303 10.0304C16.3232 9.73746 16.3232 9.26258 16.0303 8.96969C15.7374 8.6768 15.2626 8.6768 14.9697 8.96969L13 10.9394L11.0303 8.96967Z" />
                        </svg>
                        <div className="absolute left-[50%] bottom-[100%] translate-y-12 scale-0 opacity-0 translate-x-[-50%] bg-red-700 shadow-lg text-white w-max rounded-full text-base font-medium py-1 px-3 -z-10 group-hover:-translate-y-2 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 pointer-events-none">Reset Form</div>
                    </button>
                    <button
                        onClick={onprojectAdded}
                        className="group relative bg-[#2e5435] stroke-[#eee] p-3 rounded-full text-white text-base shadow-md"
                    >
                        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
                            <path d="M4 12.6111L8.92308 17.5L20 6.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="absolute right-0 bottom-[100%] translate-y-12 scale-0 opacity-0 bg-green-700 shadow-lg text-white w-max rounded-full text-base font-medium py-1 px-3 -z-10 group-hover:-translate-y-2 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 pointer-events-none">{editingProjectIdx == undefined ? "Add" : "Update"} project</div>
                    </button>
                </div>
            </div>
            <div className="flex flex-col">
                <TextInput
                    placeholder="Project Name"
                    value={state.name}
                    onChange={e => dispatch({
                        type: 'field.change',
                        field: 'position',
                        value: e.target.value
                    })}
                />
                <div className="flex gap-2">
                    <TextInput
                        className="w-0 flex-grow"
                        placeholder="Start Date"
                        value={state.startDate}
                        onChange={e => dispatch({
                            type: 'field.change',
                            field: 'startDate',
                            value: e.target.value
                        })} />
                    <TextInput
                        className="w-0 flex-grow"
                        placeholder="End Date"
                        value={state.endDate}
                        onChange={e => dispatch({
                            type: 'field.change',
                            field: 'endDate',
                            value: e.target.value
                        })} />
                </div>
                <AutoResizeTextArea
                    value={state.description}
                    onChange={e => dispatch({
                        type: 'field.change',
                        field: 'description',
                        value: e.target.value
                    })}
                    placeholder="Description here..." />
            </div>
            <BulletPoints
                key={keys.current[0]}
                onBulletsChange={(bulletPoints) => extra.current = { ...extra.current, bulletPoints }}
                bulletPoints={extra.current.bulletPoints}
            />
            <Technologies
                key={keys.current[1]}
                onTechnologiesChanged={(technologies) => extra.current = { ...extra.current, technologies }}
                technologies={extra.current.technologies}
            />
        </div>
    )
}

function ProjectCard({ project, onEnabledChange, onEdit, onDelete }: {
    project: ProjectEntry,
    onEnabledChange: (status: boolean) => void,
    onEdit: () => void,
    onDelete: () => void,
}) {

    const [expanded, setExpanded] = useState(false)

    return (
        <section className="flex flex-col gap-2 p-3 bg-white rounded-lg shadow-md">
            <header className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <h2 className="">
                        <div className="text-xl font-medium">{project.name}</div>
                    </h2>
                    <Switcher
                        initial={project.enabled}
                        onChange={onEnabledChange}
                        size="sm"
                    />
                </div>
                <div className="flex gap-3">
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
                    {expanded ||
                        <button
                            onClick={() => setExpanded(true)}
                            className="flex gap-2 items-center ml-auto py-2 pl-5 pr-3 rounded-full text-base font-medium border border-solid border-[#888] text-[#555] stroke-[#555] transition-all duration-300 hover:bg-[#888] hover:text-white hover:stroke-white">
                            More
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                <path d="M12 5V19M12 19L6 13M12 19L18 13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    }
                </div>
            </header>
            {expanded &&
                <div className="flex flex-col gap-2">
                    <div className="flex gap-4 items-center">
                        <div className="px-4 py-1 border border-solid border-[#aaa] rounded-full">{project.startDate || 'not set'}</div>
                        <div className="font-medium">To</div>
                        <div className="px-4 py-1 border border-solid border-[#aaa] rounded-full">{project.endDate || 'not set'}</div>
                    </div>
                    <p className="indent-8"> {project.description || 'not set'} </p>

                    <ul className="list-disc pl-8">
                        {
                            project.bulletPoints.length ?
                                project.bulletPoints.map((p, i) => (
                                    <li key={i}>{p}</li>
                                )) : <li>not set</li>
                        }
                    </ul>
                    <div className="flex gap-3 flex-wrap">
                        {
                            project.technologies.length ? project.technologies.map((t, i) => (
                                <div key={i} className="px-4 py-1 border border-solid border-[#aaa] rounded-full">{t.name}</div>
                            )) : <div className="px-4 py-1 border border-solid border-[#aaa] rounded-full">not set</div>
                        }
                    </div>

                    <button
                        onClick={() => setExpanded(false)}
                        className="flex gap-2 items-center ml-auto py-2 pl-5 pr-3 rounded-full text-base font-medium border border-solid border-[#888] text-[#555] stroke-[#555] transition-all duration-300 hover:bg-[#888] hover:text-white hover:stroke-white">
                        Less
                        <svg className="w-4 h-4 rotate-180" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5V19M12 19L6 13M12 19L18 13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            }
        </section>
    )
}

function ProjectList(props: {
    showAddForm: () => void,
    onEditproject: (idx: number) => void
}) {
    const { projects }: DataScheme = useMachineStore()
    const emit = useMachineEmitter()

    return (
        <div className="flex-flex-col">
            <div className="flex justify-between items-center px-4">
                <h3 className="py-2 mt-2 mb-3 text-xl font-medium">Enabled</h3>
                <Switcher
                    initial={projects.enabled}
                    onChange={(value: boolean) => emit?.({ type: 'projects.enable', value })} />
            </div>
            {
                projects.data.length == 0 ? (
                    <div className="flex flex-col items-center py-8">
                        <p className="text-3xl">No projects Yet.</p>
                        <button
                            onClick={props.showAddForm}
                            className="text-xl text-[#263f3f] font-bold underline"
                        >add project</button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3 px-3 pb-12">
                        {
                            projects.data.map((e, i) => (
                                <ProjectCard
                                    key={i}
                                    project={e}
                                    onEdit={() => props.onEditproject(i)}
                                    onDelete={() => emit?.({ type: 'project.delete', value: i })}
                                    onEnabledChange={(enabled) => console.log(enabled)}
                                />
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default function Projects() {
    const { projects }: DataScheme = useMachineStore()
    const [showForm, setShowForm] = useState(projects.data.length == 0)
    const [projectIdx, setprojectIdx] = useState<number | null>(null)

    function onShowList() {
        setShowForm(false)
        setprojectIdx(null)
    }
    function onEditproject(idx: number) {
        console.log('setting index to: ', idx)
        setprojectIdx(idx)
        setShowForm(true)
    }

    return (
        <section className='flex flex-col text-[#111] min-h-full'>
            <header className="flex justify-center items-center gap-4 m-4 mr-2">
                <button
                    className={`text-2xl py-2 px-4 flex-grow basis-0 rounded-full transition-all duration-200 ${showForm ? 'opacity-40 bg-[#bbb]' : 'opacity-100 bg-white'}`}
                    onClick={() => { setShowForm(false), setprojectIdx(null) }}
                >List</button>
                <div className="self-stretch w-[1px] my-3 bg-[#0005] hidden"></div>
                <button
                    className={`text-2xl py-2 px-4 flex-grow basis-0 rounded-full transition-all duration-200 ${showForm ? 'opacity-100 bg-white' : 'opacity-40  bg-[#bbb]'}`}
                    onClick={() => setShowForm(true)}
                >Add</button>
            </header>
            {
                showForm ?
                    <ProjectForm
                        {
                        ...(projectIdx != null ? {
                            projectIndex: projectIdx,
                            project: projects.data[projectIdx]
                        } : {})
                        }
                        showList={onShowList}
                    /> :
                    <ProjectList
                        showAddForm={() => setShowForm(true)}
                        onEditproject={onEditproject}
                    />
            }
        </section>
    )
}