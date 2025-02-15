import { useMachineStore } from "@/context/machineContexts";
import { DataScheme } from "@/machines/resumeMachine";
import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from '@codemirror/lang-javascript';
import { Alice } from "next/font/google";

const alice = Alice({
    weight: '400',
    variable: '--font-alice'
})


function Me() {
    const { basics }: DataScheme = useMachineStore();

    return (
        <div className={`${alice.className} flex gap-8 p-6`}>
            <img src={basics.image} className="object-cover h-24 w-24 border border-green-700 rounded-full" />
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

function Side() {
    const { basics }: DataScheme = useMachineStore();
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

function ResumeUI({ mstate }: { mstate: string }) {

    return (
        <div className="flex justify-center items-start gap-4 min-h-screen min-w-screen p-2 print:p-0 print:block">
            {mstate == 'templateDeveloping' &&
                <div className="self-stretch w-[55rem] bg-blue-400 grid">
                    <ReactCodeMirror
                        className="h-full text-xl"
                        value="console.log('hello world');"
                        height="100%"
                        theme={'dark'}
                        extensions={[javascript({ jsx: true })]}
                    />
                </div>
            }
            <div id="resumeUI" className={`box-content border ${alice.variable}`}>
                <Me />
                <div className="flex content">
                    <Side />
                    <main className="column main">main</main>
                </div>
            </div>
            {mstate == 'templateDeveloping' ||
                <div className="flex flex-col self-stretch gap-4 print:hidden">
                    <div className="bg-gray-500 w-32 h-[calc(1.414*8rem)] rounded-md"></div>
                    <div className="bg-gray-500 w-32 h-[calc(1.414*8rem)] rounded-md"></div>
                </div>
            }
        </div>
    )
}

export default ResumeUI