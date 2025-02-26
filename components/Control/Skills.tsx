
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import Switcher from '../Switcher';
import { useMachineStore, useMachineEmitter } from '@/context/machineContexts';
import { DataScheme, SkillEntry } from '@/machines/types';
import TextInput from '../Input';
import Select from 'react-select'
import RangeInput from '../RangeInput';
import ImageInput from '../ImageInput';
import { iconBase64, skillsOptions, softwareOption } from './common/staticData';
import { twMerge } from 'tailwind-merge';


interface CategoryOption { value: string, label: string }


function findOptionByLabel(label: string | undefined): CategoryOption | undefined {
    if (!label) return undefined
    const catlookup = skillsOptions.find(o => o.label == label)
    return catlookup
}

function SkillsForm({ skill, onUpdate } : 
    { skill?: SkillEntry, onUpdate?: () => void }
    | { skill: SkillEntry, onUpdate: () => void }
)
{
    const [icon, setIcon] = useState(skill?.icon ?? iconBase64)
    const [name, setName] = useState(skill?.name ?? '')
    const [rating, setRating] = useState(skill?.rating ?? 10)
    const [category, setCategory] = useState<CategoryOption>(
        findOptionByLabel(skill?.category) ?? skillsOptions[0]
    )
    const emit = useMachineEmitter()

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!name) return
        const value = { 
            name, rating,
            category: category.label,
            icon: category == softwareOption ? icon : undefined
        }

        setName('')
        setRating(10)
        setIcon(iconBase64)

        if (skill) {
            emit({
                type: 'skill.update',
                id: skill.name,
                value
            })
            onUpdate?.()
        } else {
            emit({
                type: 'skill.add',
                value
            })
        }
    }


    return (
        <form id="contact-info-links-form" className="p-4" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
                <div className="flex gap-2 relative z-50">
                    {
                        category == softwareOption &&
                        <ImageInput
                            onChange={(url: string) => setIcon(url)}
                            key={icon || 'link-icon'}
                            value={icon}
                            className="h-12 w-12 rounded-xl overflow-hidden z-50 relative"
                            optionsClassName='top-[calc(100%+0.5rem)] left-0'
                        />
                    }
                    <TextInput value={name}
                        className='flex-grow'
                        onChange={e => setName(e.target.value)}
                        placeholder="Skill" />
                </div>
                <Select
                    options={skillsOptions}
                    className='cursor-pointer'
                    isSearchable={true}
                    onChange={v => setCategory(v ?? skillsOptions[0])}
                    value={category}
                    classNames={{
                        container: () => 'select-container',
                        control: () => 'select-control',
                        option: (s) => {
                            return `select-option ${s.isFocused ? 'focused' : ''} ${s.isSelected ? 'selected' : ''}`
                        },
                        menu: () => 'select-menu'
                    }}
                    maxMenuHeight={200}
                />
                <RangeInput
                    value={rating}
                    onChange={(val) => setRating(val)}
                />
                <button
                    className='py-2 bg-[#263f3f50] capitalize text-lg text-[#000] flex-grow mt-1 rounded-full shadow-sm transition-all duration-200 hover:shadow-lg hover:translate-y-[-1px]'
                >{skill ? 'update' : 'add'}</button>
            </div>
        </form>
    )
}

function SkillCard({ skill, onEdit, onDelete }: {
    skill: SkillEntry,
    onEdit?: () => void,
    onDelete?: () => void
}) {
    const emit = useMachineEmitter()
    const full = Math.floor(skill.rating)
    const width = (skill.rating - full) * 100
    return (
        <section className="flex flex-col gap-2 p-3 bg-white rounded-lg shadow-md">
            <header className="flex justify-between items-start">
                <div className="flex flex-col">
                    <h2 className="text-xl font-medium">{skill.name}</h2>
                </div>
                <Switcher
                    initial={skill.enabled}
                    onChange={enabled => emit?.({ type: 'skill.update', id: skill.name, value: { enabled } })}
                    size="sm"
                />
            </header>
            <h3 className="text-lg">{skill.category}</h3>
            <div className="flex gap-1">
                {
                    [...Array(10)].map((_, idx) => {
                        if (idx < full) return (
                            <div key={'full' + idx}
                                className='basis-0 flex-grow h-2 bg-gradient-to-br from-[#C6920D] to-[#D09D1F] rounded-full'
                            ></div>)
                        else if (idx == full) return (
                            <div key={'part'}
                                className='relative overflow-hidden basis-0 flex-grow h-2 bg-gray-400 rounded-full'>
                                <div className='absolute top-0 left-0 bg-gradient-to-br from-[#C6920D] to-[#D09D1F] w-[var(--w)] h-full' style={{ '--w': `${width}%` } as React.CSSProperties}></div>
                            </div>
                        )
                        return (
                            <div key={'empty' + idx} className='basis-0 flex-grow h-2 bg-gray-400 rounded-full' ></div>
                        )
                    })

                }
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

type FilterFunction = (s:SkillEntry[]) => SkillEntry[]

function SkillsFilter({ onFilterChange }: {
    onFilterChange?: (f: FilterFunction) => void
}) {
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const [allowed, setAllowed] = useState<string[]>([])
    const ref = useRef<HTMLDivElement>(null)

    const onSkillClick = (option: CategoryOption) => {
        let newAllowed: typeof allowed

        if (allowed.includes(option.label))
            newAllowed = allowed.filter(c => c != option.label)
        else
            newAllowed = [...allowed, option.label]
        setAllowed(newAllowed)

        console.log('new Allowed: ', newAllowed, allowed)

        if (newAllowed.length == 0) onFilterChange?.(skills => skills)
        else onFilterChange?.((skills) => skills.filter(s => newAllowed.includes(s.category)))
    }

    useEffect(() => {
        setHeight(ref.current?.offsetWidth ?? 0)
        setWidth((ref.current?.firstElementChild as HTMLDivElement).offsetWidth)
    })


    return (
        <div className="relative h-14 overflow-hiddenf" ref={ref} style={{height: `${width}px`}}>
            <div className="custom-scrollbar absolute top-0 left-0 flex flex-col gap-2 mr-1 px-2 overflow-x-visible overflow-y-auto -scale-x-100 -rotate-90 origin-[1.5rem_1.5rem]" style={{ height: `${height}px` }}>
                {
                    skillsOptions.map(option => (
                        <div key={option.label} onClick={() => onSkillClick(option)} className={twMerge("flex-shrink-0 flex flex-col items-center gap-2 py-2 px-1 rounded-full bg-white border border-solid shadow-lg text-[#333] text-base -scale-x-100 cursor-pointer", allowed.includes(option.label) && "bg-yellow-600")}>
                            <div className="[writing-mode:vertical-lr] select-none py-2">{ option.label }</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

function SkillList({ onEdit }: {
    onEdit?: (skill: SkillEntry) => void
}) {
    const { skills }: DataScheme = useMachineStore()
    const [data, setData] = useState(skills.data)
    const emit = useMachineEmitter()

    return (
        <div className="flex flex-col gap-3 px-3 pb-12">
            { skills.data.length ? <SkillsFilter onFilterChange={(f) => setData(f(skills.data))} /> : null }
            {
                data.map((skill, i) => (
                    <SkillCard
                        key={i}
                        skill={skill}
                        onEdit={() => onEdit?.(skill)}
                        onDelete={() => emit?.({ type: 'skill.delete', id: skill.name })}
                    />
                ))
            }
        </div>
    )
}

export default function Skills() {
    const { skills }: DataScheme = useMachineStore()
    const send = useMachineEmitter()

    const [editing, setEditing] = useState(false)
    const [skill, setSkill] = useState<SkillEntry | undefined>();

    return (
        <div>
            <section className={`flex flex-col text-black ${editing ? "blur-md" : ""}`}>
                <header className="flex justify-between p-4 items-center">
                    <h3 className="text-xl font-medium">Enabled</h3>
                    <Switcher
                        onChange={(enabled: boolean) => send?.({ type: 'skills.enabled', value: enabled })}
                        initial={skills.enabled}
                    />
                </header>
                <div className='bg-white border border-solid border-gray-300 rounded-xl shadow-md mx-2 mb-4'>
                    <SkillsForm />
                </div>
                <SkillList
                    onEdit={(s: SkillEntry) => { setEditing(true); setSkill(s) }}
                />

            </section>

            {/* update skill form modal */}
            <div className={`absolute top-0 left-0 w-full h-full justify-center items-center ${editing ? 'flex' : 'hidden'}`}>
                <div className='flex flex-col w-[calc(100%-2rem)] gap-2'>
                    <button
                        onClick={() => { setEditing(false); setSkill(undefined); }}
                        className='px-6 py-2 self-end bg-white border border-solid border-gray-300 rounded-full shadow-sm stroke-black transition-all duration-200 hover:shadow-lg hover:translate-y-[-1px]'>
                        <svg className="w-4" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001"></path>
                        </svg>
                    </button>
                    <div className='bg-white border border-solid border-gray-300 rounded-xl shadow-lg'>
                        <SkillsForm
                            key={skill?.name + "-" + skill?.rating}
                            skill={skill}
                            onUpdate={() => { setEditing(false); setSkill(undefined); }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
