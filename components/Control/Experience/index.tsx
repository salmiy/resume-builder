import { useState } from "react";
import { useMachineStore } from "@/context/machineContexts";
import { DataScheme } from "@/machines/types";

import ExperienceForm from "./Form";
import ExperienceList from "./List";

export default function Experience() {
    const { experience }: DataScheme = useMachineStore()
    const [showForm, setShowForm] = useState(experience.data.length == 0)
    const [experienceIdx, setExperienceIdx] = useState<number | null>(null)

    function onShowList() {
        setShowForm(false)
        setExperienceIdx(null)
    }
    function onEditExperience(idx: number) {
        console.log('setting index to: ', idx)
        setExperienceIdx(idx)
        setShowForm(true)
    }

    return (
        <section className='flex flex-col text-[#111] min-h-full'>
            <header className="flex justify-center items-center gap-4 m-4 mr-2">
                <button
                    className={`text-2xl py-2 px-4 flex-grow basis-0 rounded-full transition-all duration-200 ${showForm ? 'opacity-40 bg-[#bbb]' : 'opacity-100 bg-white'}`}
                    onClick={() => { setShowForm(false), setExperienceIdx(null) }}
                >List</button>
                <div className="self-stretch w-[1px] my-3 bg-[#0005] hidden"></div>
                <button
                    className={`text-2xl py-2 px-4 flex-grow basis-0 rounded-full transition-all duration-200 ${showForm ? 'opacity-100 bg-white' : 'opacity-40  bg-[#bbb]'}`}
                    onClick={() => setShowForm(true)}
                >Add</button>
            </header>
            {
                showForm ?
                    <ExperienceForm
                        {
                        ...(experienceIdx != null ? {
                            experienceIndex: experienceIdx,
                            experience: experience.data[experienceIdx]
                        } : {})
                        }
                        showList={onShowList}
                    /> :
                    <ExperienceList
                        showAddForm={() => setShowForm(true)}
                        onEditExperience={onEditExperience}
                    />
            }
        </section>
    )
}