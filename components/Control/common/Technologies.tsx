import DeleteButton from "@/components/DeleteButton"
import TextInput from "@/components/Input"
import ImageInput from "@/components/ImageInput"
import Image from "next/image"
import { SkillEntry, TechnologyEntry } from "@/machines/types"
import { FormEvent, useEffect, useRef, useState } from "react"
import { iconBase64, softwareOption } from "./staticData"
import { useMachineStore } from "@/context/machineContexts"

function SoftwareSkills({ skills, onSkillClick }: { 
    skills: SkillEntry[],
    onSkillClick?: (s:SkillEntry) => void
}) {
    const [height, setHeight] = useState(0)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => setHeight(ref.current?.offsetWidth ?? 0), [])


    return skills.length == 0 ? null : (
        <div className="relative h-14 overflow-hidden" ref={ref}>
            <div className="custom-scrollbar absolute top-0 left-0 flex flex-col gap-2 py-2 px-2 overflow-x-visible overflow-y-auto -scale-x-100 -rotate-90 origin-[1.5rem_1.5rem]" style={{ height: `${height}px` }}>
                {
                    skills.map(skill => (
                        <div key={skill.name} onClick={() => onSkillClick?.(skill)} className="flex-shrink-0 flex flex-col items-center gap-2 py-2 px-1 rounded-full bg-white border border-solid shadow-md text-[#333] text-base -scale-x-100 cursor-pointer">
                            <div className="relative w-6 h-6 rounded-lg rotate-90 overflow-hidden">
                                <Image className="object-contain" src={skill.icon ?? iconBase64} alt="docker" fill />
                            </div>
                            <div className="[writing-mode:vertical-lr] select-none">{ skill.name }</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default function Technologies(props: {
    onTechnologiesChanged?: (e: TechnologyEntry[]) => void,
    technologies?: TechnologyEntry[]
}) {
    const { skills } = useMachineStore();
    const [icon, setIcon] = useState(iconBase64)
    const [name, setName] = useState("")
    const [list, setList] = useState<TechnologyEntry[]>(props.technologies ?? [])


    function onTechnologyAdded(e: FormEvent) {
        e.preventDefault()

        if (!name) return

        const techs = [...list, { name, icon }]
        setList(techs);
        setIcon(iconBase64)
        setName("")
        props?.onTechnologiesChanged?.(techs)
    }
    function onTechnologyDeleted(idx: number) {
        const techs = list.filter((_, i) => i != idx)
        setList(techs)
        props.onTechnologiesChanged?.(techs)
    }
    function onSkillClick(skill: SkillEntry) {
        if (list.find(e => e.name == skill.name)) return
        const techs = [...list, { name: skill.name, icon: skill.icon ?? iconBase64 }]
        setList(techs);

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
            <SoftwareSkills
                skills={skills.data.filter(s => s.category == softwareOption.label)}
                onSkillClick={onSkillClick} />
            <ul className="flex flex-col gap-2 px-3 py-2 pl-6 text-lg mt-4">
                {
                    list.map((t, i) => (
                        <li key={i} className="flex gap-3 items-start">
                            <div className="relative w-8 h-8 rounded-md overflow-hidden">
                                <Image src={t.icon} alt={t.name + ' icon'} className="object-contain" fill />
                            </div>
                            <div className="flex-grow text-xl capitalize break-words break-all">{t.name}</div>
                            <DeleteButton
                                onClick={() => onTechnologyDeleted(i)}
                                className="w-6 h-6 stroke-red-600 stroke-2 self-center flex-shrink-0 hover:animate-wiggle-fast ease-linear"
                            />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}