
import { FormEvent, useState } from 'react';
import { useMachineEmitter } from '@/context/machineContexts';
import { SkillEntry } from '@/machines/types';
import { iconBase64, skillsOptions, softwareOption } from '@/components/Control/common/staticData';
import TextInput from '@/components/Input';
import Select from 'react-select'
import RangeInput from '@/components/RangeInput';
import ImageInput from '@/components/ImageInput';

import { CategoryOption } from './types';


function findOptionByLabel(label: string | undefined): CategoryOption | undefined {
    if (!label) return undefined
    const catlookup = skillsOptions.find(o => o.label == label)
    return catlookup
}

export default function SkillsForm({ skill, onUpdate } : 
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