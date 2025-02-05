import { useMachineStore } from "@/context/machineContexts";
import { Alice } from "next/font/google";

const alice = Alice({
    weight: '400',
    variable: '--font-alice'
})


const Me = () => {
    const contactInfo = useMachineStore();

    return (
        <div className={`${alice.className} flex gap-8 p-6`}>
            <img src={contactInfo.data.image} className="object-cover h-24 w-24 border border-green-700 rounded-full" />
            <div className="flex flex-col justify-center">
                <h1 className={`text-4xl font-bold`}>{ contactInfo.data.name }</h1>
                <h2 className="text-xl font-bold text-[#666]">Software Engineer</h2>
            </div>
            <div className="flex flex-col justify-center ml-auto">
                <h3 key="email" className="text-xl text-[#444]"> { contactInfo.data.email }</h3>
                <h3 key="phone" className="text-xl text-[#444]"> { contactInfo.data.phone }</h3>
                <h3 key="links" className="text-xl text-[#444] flex gap-2"> { contactInfo.data.links.map(l => <span>{ l.userId }</span>) }</h3>
            </div>
        </div>
    )
}

function ResumeUI() {
    return (
        <div className="grid justify-center items-center min-h-screen min-w-screen p-2 print:p-0 print:block">
            <div id="resumeUI" className="shadow-2xlf box-content border">
                <Me />
                <div className="row content">
                    <div className="column side">side</div>
                    <main className="column main">main</main>
                </div>
            </div>
        </div>
    )
}

export default ResumeUI