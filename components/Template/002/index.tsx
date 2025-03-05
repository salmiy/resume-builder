import { DataScheme } from "@/machines/types";
import { Alice } from "next/font/google";


const alice = Alice({
    weight: '400',
    variable: '--font-alice',
    subsets: ['latin', 'latin-ext']
})


export default function Template({ data }: { data: DataScheme }) {
    return (
        <>
            <Me basics={data.basics} />
            <div className="flex content">
                <Side data={data} />
                <main className="column main">main</main>
            </div>
        </>
    )
}

function Me({basics}:{basics: DataScheme['basics']}) {

    return (
        <div className={`${alice.className} flex gap-8 p-6`}>
            <div className="flex flex-col justify-center">
                <h1 className={`text-4xl font-bold capitalize`}>{basics.name}</h1>
                <h2 className="text-xl font-bold text-[#666] capitalize">{basics.title}</h2>
            </div>
            <div className="flex flex-col justify-center ml-auto">
                <h3 key="address" className="text-xl text-[#444] text-end"> {basics.address}</h3>
                <h3 key="email" className="text-xl text-[#444] text-end"> {basics.email}</h3>
                <h3 key="phone" className="text-xl text-[#444] text-end"> {basics.phone}</h3>
            </div>
        </div>
    )
}

function Side( { data } : { data: DataScheme }) {
    const { basics }: DataScheme = data
    return (
        <div className="column flex flex-col p-3 pt-0 w-[70mm] font-[family-name:var(--font-alice)]">
            {
                basics.summary.enabled &&
                <section>
                    <header>
                        <h2 className="text-[1.75rem] leading-tight font-bold">Summary</h2>
                    </header>
                    <p className="indent-[8mm]">
                        {basics.summary.data}
                    </p>
                </section>
            }
        </div>
    )
}