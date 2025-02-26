import { useReducer, useState, useRef } from "react";
import TextInput from "@/components/Input";
import { AutoResizeTextArea } from "@/components/AutoResizeTextArea";
import { useMachineEmitter } from "@/context/machineContexts";
import { ExperienceEntry } from "@/machines/types";
import BulletPoints from "@/components/Control/common/BulletPoints";
import Technologies from "@/components/Control/common/Technologies";

import { FormState, FormReducerEvent, ExperienceExtra } from "./types";

type FormProps = { showList?: () => void } & (
                    { experienceIndex?: number, experience?: ExperienceEntry }
                    | { experienceIndex: number, experience: ExperienceEntry }
                )

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
                position: "",
                company: "",
                location: "",
                startDate: "",
                endDate: "",
                description: ""
            }
            break;
    }
    return state
}

export default function ExperienceForm(props: FormProps) {
    const { bulletPoints, technologies, ...expBasics } = props.experience ?? {
        bulletPoints: [], technologies: [],
        position: "", company: "",
        location: "", startDate: "",
        endDate: "", description: ""
    }
    const emit = useMachineEmitter()
    const extra = useRef<ExperienceExtra>({ bulletPoints, technologies })
    const keys = useRef<[string, string]>(['bullets', 'techs'])
    const [editingExpIdx, setEditingExpIdx] = useState(props.experienceIndex)
    const [editingMsgDismissed, setEditingMsgDismissed] = useState(props.experienceIndex == undefined)
    const [state, dispatch] = useReducer(formReducer, expBasics)

    function onExperienceAdded() {
        const value = { ...state, ...extra.current }
        if (editingExpIdx != undefined)
            emit({
                type: 'experience.update',
                index: editingExpIdx,
                value
            })

        else
            emit?.({
                type: 'experience.add',
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
                    Editing existing experience
                    <div className="flex gap-2">
                        <button
                            onClick={() => { setEditingMsgDismissed(true); setEditingExpIdx(undefined) }}
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
                <h3 className="section-title text-xl font-medium">Add Experience</h3>
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
                        onClick={onExperienceAdded}
                        className="group relative bg-[#2e5435] stroke-[#eee] p-3 rounded-full text-white text-base shadow-md"
                    >
                        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
                            <path d="M4 12.6111L8.92308 17.5L20 6.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="absolute right-0 bottom-[100%] translate-y-12 scale-0 opacity-0 bg-green-700 shadow-lg text-white w-max rounded-full text-base font-medium py-1 px-3 -z-10 group-hover:-translate-y-2 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 pointer-events-none">{editingExpIdx == undefined ? "Add" : "Update"} Experience</div>
                    </button>
                </div>
            </div>
            <div className="flex flex-col">
                <TextInput
                    placeholder="Position"
                    value={state.position}
                    onChange={e => dispatch({
                        type: 'field.change',
                        field: 'position',
                        value: e.target.value
                    })}
                />
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