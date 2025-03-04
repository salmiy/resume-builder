import { useState } from "react";
import { useMachineStore } from "@/context/machineContexts";
import { DataScheme } from "@/machines/types";

import EducationForm from "./Form";
import EducationList from "./List";

export default function Education() {
    const { education }: DataScheme = useMachineStore()
    const [showForm, setShowForm] = useState(education.data.length == 0)
    const [educationIdx, setEducationIdx] = useState<number | null>(null)

    function onShowList() {
        setShowForm(false)
        setEducationIdx(null)
    }
    function onEditEducation(idx: number) {
        setEducationIdx(idx)
        setShowForm(true)
    }

    return (
        <section className='flex flex-col text-[#111] min-h-full'>
            <header className="flex justify-center items-center gap-4 m-4 mr-2">
                <button
                    className={`text-2xl py-2 px-4 flex-grow basis-0 rounded-full transition-all duration-200 ${showForm ? 'opacity-40 bg-[#bbb]' : 'opacity-100 bg-white'}`}
                    onClick={onShowList}
                >List</button>
                <div className="self-stretch w-[1px] my-3 bg-[#0005] hidden"></div>
                <button
                    className={`text-2xl py-2 px-4 flex-grow basis-0 rounded-full transition-all duration-200 ${showForm ? 'opacity-100 bg-white' : 'opacity-40  bg-[#bbb]'}`}
                    onClick={() => setShowForm(true)}
                >Add</button>
            </header>
            {
                showForm ?
                    <EducationForm
                        {
                        ...(educationIdx != null ? {
                            educationIndex: educationIdx,
                            education: education.data.find(e => e.id == educationIdx)
                        } : {})
                        }
                        showList={onShowList}
                    /> :
                    <EducationList
                        showAddForm={() => setShowForm(true)}
                        onEditEducation={onEditEducation}
                    />
            }
        </section>
    )
}