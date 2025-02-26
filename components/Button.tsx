import { twMerge } from "tailwind-merge"

export default function Button({ children, onClick, className, bgClass, text, stroke }: {
    children: React.ReactNode,
    onClick?: () => void,
    className?: string,
    bgClass?: string,
    text: string,
    stroke?: boolean
}) {
    return (
        <button onClick={onClick} className={
            twMerge(
                "group relative flex h-16 w-16",
                stroke ? "stroke-2 stroke-[#eee] fill-none" : "fill-[#eee] stroke-none",
                className
            )}
        >
            <div className={twMerge("relative h-full w-full bg-yellow-700 p-5 z-10 rounded-full shadow", bgClass)}>
                {children}
            </div>
            <div className="font-[family-name:var(--font-ibm-plex-mono)] h-4 w-4 absolute bottom-1/2 left-1/2 -translate-x-1/2">
                {
                    text.split('').map((l, i, a) => (
                        <div
                            key={'letter' + i}
                            className='absolute leading-none w-full bottom-0 left-0 h-0 text-lg font-semibold origin-[bottom_center] text-center -z-10 transition-all duration-300 rotate-[calc(160deg+var(--rot))] group-hover:h-14 group-hover:rotate-[var(--rot)] pointer-events-none'
                            style={{ '--rot': (16 * (i - a.length / 2 + .5)) + 'deg' } as React.CSSProperties}
                        >
                            {l}
                        </div>
                    ))
                }
            </div>
        </button>
    )
}