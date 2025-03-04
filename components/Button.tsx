import { twMerge } from "tailwind-merge"

export default function Button({ children, onClick = () => {}, className, bgClass, text, stroke }: {
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
            <div className="label font-[family-name:var(--font-ibm-plex-mono)] sm:h-4 w-4 max-sm:w-auto absolute bottom-1/2 left-1/2 -translate-x-1/2 max-sm:flex max-sm:left-full max-sm:translate-x-1 max-sm:bg-white max-sm:rounded-full max-sm:border max-sm:border-solid max-sm:translate-y-1/2 max-sm:p-4 max-sm:py-3 max-sm:backdrop-blur-md">
                {
                    text.split('').map((l, i, a) => (
                        <div
                            key={i}
                            className='sm:absolute leading-none w-full bottom-0 left-0 sm:h-0 text-lg font-semibold origin-[bottom_center] text-center -z-10 transition-all duration-300 sm:rotate-[calc(160deg+var(--rot))] sm:group-hover:h-14 sm:group-hover:rotate-[var(--rot)] pointer-events-none max-sm:static max-sm:whitespace-pre max-sm:h-auto max-sm:rotate-0 max-sm:group-hover:h-auto '
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