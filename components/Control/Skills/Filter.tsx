
import { useEffect, useRef, useState } from 'react';
import { skillsOptions } from '@/components/Control/common/staticData';
import { twMerge } from 'tailwind-merge';
import { CategoryOption, FilterFunction } from './types';

export default function SkillsFilter({ onFilterChange }: {
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

        if (newAllowed.length == 0) onFilterChange?.(skills => skills)
        else {
            const filter: FilterFunction = (skills) => skills.filter(s => newAllowed.includes(s.category))
            onFilterChange?.(filter)
        }
    }

    useEffect(() => {
        setHeight(ref.current?.offsetWidth ?? 0)
        setWidth((ref.current?.firstElementChild as HTMLDivElement).offsetWidth)
    }, [])


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