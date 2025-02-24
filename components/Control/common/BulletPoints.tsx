import { AutoResizeTextArea } from "@/components/AutoResizeTextArea"
import DeleteButton from "@/components/DeleteButton"
import { FormEvent, useState } from "react"

interface PropsType {
    onBulletsChange?: (bullets: string[]) => void,
    bulletPoints?: string[]
}


export default function BulletPoints(props: PropsType) {
    const [bulletPoint, setBulletPoint] = useState('')
    const [bulletPoints, setBulletPoints] = useState<string[]>(props.bulletPoints ?? [])

    function onBulletPointAdded(e: FormEvent) {
        e.preventDefault()

        if (!bulletPoint) return

        const bullets = [...bulletPoints, bulletPoint]
        setBulletPoints(bullets);
        setBulletPoint('')
        props?.onBulletsChange?.(bullets)
    }
    function onBulletPointDeleted(idx: number) {
        const bullets = bulletPoints.filter((_, i) => i != idx)
        setBulletPoints(bullets)
        props.onBulletsChange?.(bullets)
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
            <ul className="px-3 py-2 pl-6 text-lg list-disc">
                {
                    bulletPoints.map((point, i) => (
                        <li key={i} className="capitalize flex gap-3 items-start">
                            <div className="h-[6px] w-[6px] rounded-full bg-black flex-shrink-0 mt-3"></div>
                            <p className="flex-grow">{point}</p>
                            <DeleteButton
                                onClick={() => onBulletPointDeleted(i)}
                                className="w-6 h-6 stroke-red-600 stroke-2 self-center flex-shrink-0 hover:animate-wiggle-fast ease-linear"
                            />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}