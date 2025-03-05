'use client';
import { useMachineStore } from "@/context/machineContexts";
import { DataScheme } from "@/machines/types";
import ReactCodeMirror from "@uiw/react-codemirror";
import React, { useEffect, useRef, useState } from "react";
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { StateValue } from "xstate";
import { useEmblaButtons } from "@/context/EmblaCarousel";
import { findStyleSheetByTitle, changeStyleSheetSelectors } from "./utils"
import { defaultCssCode, defaultJsCode } from "./defaults";
import { Alice, Roboto } from "next/font/google";
import { twMerge } from "tailwind-merge";
import useEmblaCarousel from "embla-carousel-react";
import Template001 from "./Template001";
import { MachineEmitter } from "@/machines/resumeMachine";
import Image from "next/image";

const alice = Alice({
    weight: '400',
    variable: '--font-alice',
    subsets: ['latin', 'latin-ext']
})
const roboto = Roboto({
    weight: ['400', '500', '700'],
    variable: '--font-roboto',
    subsets: ['latin', 'latin-ext']
})

type TemplateType = (arg: { data: DataScheme }) => React.JSX.Element
type TemplateEntry = { Template: TemplateType, image?: string }



const templates = [
    { Template: Template001, image: '/template001.png' },
]


function ResumeUI({ mstate, emit }: { mstate: StateValue, emit: MachineEmitter }) {
    const data: DataScheme = useMachineStore();
    const styleRef = useRef<HTMLStyleElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [template, setTemplate] = useState({ Template: Template001 })
    const [editorTemplate, setEditorTemplate] = useState<TemplateEntry | undefined>(undefined)
    const [code, setCode] = useState({ js: defaultJsCode, css: defaultCssCode });
    const [compiling, setCompiling] = useState(false)
    const [scale, setScale] = useState(1);


    async function applyTemplate() {
        setCompiling(true);
        const Babel = await import('@babel/standalone')
        try {
            const babelOut = Babel.transform(
                `${code.js}`,
                { presets: ['react'] }
            )
            const tcode = babelOut.code
            const getComp = new Function('React', ` ${tcode}; return { Template }`)
            if (tcode) {
                const template = getComp(React)
                setTemplate(template)
                setEditorTemplate(template)
                if (styleRef.current) styleRef.current.innerHTML = code.css
                changeStyleSheetSelectors(
                    findStyleSheetByTitle('customResumeCss'),
                    s => `#resumeUI ${s}`
                )
            }
        } catch (error) {
            console.log('error', error)
        }
        setCompiling(false)
    }
    function onCodeChange(value: string, type: 'js' | 'css') {
        setCode({ ...code, [type]: value })
    }

    return (
        <div className={`${alice.variable} flex min-h-screen min-w-full overflow-auto print:overflow-hidden print:p-0 print:block`}>
            {mstate == 'templateDeveloping' &&
                <>
                    <Editor jsCode={code.js} cssCode={code.css} onChange={onCodeChange}
                        onApply={applyTemplate} onDone={() => emit({ type: 'developingFinished' })}
                    />
                    {compiling && <Compiling />}
                </>
            }
            <div className="flex flex-grow gap-4">
                <div
                    className="m-auto flex-grow-0 flex max-lg:w-[var(--width)] max-lg:h-[var(--height)] flg:w-[210mm] lg:h-[297mm] p-4 box-content print:p-0 print:contents print:box-border print:overflow-hidden print:w-auto print:h-auto"
                    style={{
                        '--scale': scale,
                        '--height': `${containerRef.current?.offsetHeight}px`,
                        '--width': `${210 * scale}mm`,
                    } as React.CSSProperties}
                >
                    <div ref={containerRef} className="flex-grow flex items-center justify-center min-h-[297mm] min-w-[210mm] max-w-[210mm] origin-top-left scale-[var(--scale)] lg:scale-100 print:scale-100 print:overflow-hidden">
                        <div
                            key="page"
                            id="resumeUI"
                            className={`${roboto.variable} border border-neutral-300 min-h-[297mm] w-[210mm] min-w-[210mm] max-w-[210mm] box-border print:border-none print:m-0`}>
                            <template.Template data={data} />
                        </div>
                    </div>
                </div>
                {
                    mstate == 'templateDeveloping' ||
                    <TemplatesCarousel
                        templates={templates}
                        customTemplate={editorTemplate}
                        onTemplateClick={t => setTemplate(t)} />
                }
            </div>
            <style title="customResumeCss" ref={styleRef}></style>
            <div className="fixed bottom-4 lg:bottom-8 right-6 flex gap-6 lg:hidden print:hidden">
                <button onClick={() => setScale(Math.min(1, scale + .1))} className="flex items-center p-3 lg:p-4 rounded-full bg-neutral-300 shadow-xl transition-all duration-200 hover:-translate-y-[2px]">
                    <svg className="w-6 h-6 lg:w-8 lg:h-8 stroke-black" viewBox="0 0 24 24" fill="none">
                        <path d="M 11 13 L 4 20 m 0 0 h 9 m -9 0 v -9 M 13 11 L 20 4 m 0 0 h -9 m 9 0 v 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button onClick={() => setScale(Math.max(.3, scale - .1))} className="flex items-center p-3 lg:p-4 rounded-full bg-neutral-300 shadow-xl transition-all duration-200 hover:-translate-y-[2px]">
                    <svg className="w-6 h-6 lg:w-8 lg:h-8 stroke-black" viewBox="0 0 24 24" fill="none">
                        <path d="M 21 3 L 14 10 m 0 0 h 9 m -9 0 v -9 M 3 21 L 10 14 m 0 0 h -9 m 9 0 v 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

function Compiling() {
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-[#0000] backdrop-blur-sm flex justify-center items-center">
            <svg className="w-24 h-24" viewBox="0 0 200 200">
                <path fill="none" strokeLinecap="round" stroke="#263f3f" strokeWidth="15" d="M70 95.5V112m0-84v16.5m0 0a25.5 25.5 0 1 0 0 51 25.5 25.5 0 0 0 0-51Zm36.4 4.5L92 57.3M33.6 91 48 82.7m0-25.5L33.6 49m58.5 33.8 14.3 8.2">
                    <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="3" from="360 70 70" to="0 70 70" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
                </path>
                <path fill="none" strokeLinecap="round" stroke="#263f3f" strokeWidth="15" d="M130 155.5V172m0-84v16.5m0 0a25.5 25.5 0 1 0 0 51 25.5 25.5 0 0 0 0-51Zm36.4 4.5-14.3 8.3M93.6 151l14.3-8.3m0-25.4L93.6 109m58.5 33.8 14.3 8.2">
                    <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="3" from="0 130 130" to="360 130 130" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
                </path>
            </svg>
        </div>
    )
}

function TemplatesCarousel({ templates, onTemplateClick, customTemplate }: {
    templates: TemplateEntry[],
    onTemplateClick: (template: TemplateEntry) => void,
    customTemplate?: TemplateEntry
}) {
    const [isShown, setIsShown] = useState(false)
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, axis: 'y', dragFree: true })
    const { onPrevButtonClick, onNextButtonClick } = useEmblaButtons(emblaApi)

    return (
        <div className={twMerge("flex self-stretch fixed top-0 right-0 h-full transition-all duration-300 z-20 lg:static lg:translate-x-0 print:hidden", !isShown && "translate-x-44")}>
            <button onClick={() => setIsShown(!isShown)} className="group absolute bottom-32 left-0 -translate-x-full flex items-center z-20 lg:hidden">
                <div key="hook" className="w-5 h-10 sm:w-8 sm:h-16 pl-2 bg-neutral-200 rounded-l-full z-20 shadow-template-page">
                    <svg className={twMerge(
                        "w-full h-full stroke-black transition-all duration-300 delay-100 group-hover:-translate-x-1",
                        isShown && "rotate-180 group-hover:translate-x-1")} viewBox="0 0 20 20" fill="none">
                        <path d="M 17 10 l -12.7279 0 m 0 0 l 6.364 6.364 m -6.364 -6.364 l 6.364 -6.364" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div key="list" className="flex flex-col gap-2 p-3 pr-2 bg-gradient-to-r from-neutral-200 to-neutral-100 rounded-l-2xl shadow-template-page">
                    <div key="t1" className="w-4 h-6 sm:w-6 sm:h-10 bg-template-page rounded-sm sm:rounded-md"></div>
                    <div key="t3" className="w-4 h-6 sm:w-6 sm:h-10 bg-template-page rounded-sm sm:rounded-md"></div>
                </div>
            </button>
            <div className="relative self-stretch w-44 bg-neutral-100 flex flex-col gap-2 shadow lg:shadow-none">
                <div className="absolute top-0 left-0 w-full z-10 bg-gradient-to-b from-[70%] from-neutral-100 p-2 px-4">
                    <button
                        onClick={onNextButtonClick}
                        className="h-12 bg-slate-600 border-2 border-solid w-full border-slate-500 stroke-white py-[12px] rounded-full grid justify-center items-center box-border transition-all duration-150 hover:border-[6px] hover:py-[6px]">
                        <svg className="w-full h-full" fill="none" viewBox="0 0 20 20">
                            <path strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"
                                d="M 1 14 L 10 6 L 19 14"
                            />
                        </svg>
                    </button>
                </div>
                <div className="flex-grow relative z-0">
                    <div className="absolute top-0 left-0 h-full w-full overflow-hidden px-4" ref={emblaRef}>
                        <div className="flex flex-col gap-4 h-full max-h-full">
                            <div key="topEmptySpace" className="min-h-0 basis-[3.5rem] flex-grow-0 flex-shrink-0"></div>
                            {customTemplate &&
                                <div key={'customtemplate'} onClick={() => onTemplateClick(customTemplate)} className="group flex flex-col gap-0 cursor-pointer">
                                    <div className="relative min-h-0 basis-[12rem] flex-grow-0 flex-shrink-0 w-[calc(12rem/1.414)] rounded-md bg-yellow-600 transition-all duration-300 group-hover:bg-yellow-500" >
                                        <Image src="/codeEditor.png" alt="code editor template" className="object-contain" fill />
                                    </div>
                                    <div className="text-lgf capitalize text-center">Editor template</div>
                                </div>
                            }
                            {
                                templates.map((t, i) => (
                                    <div key={'template' + i} onClick={() => onTemplateClick(t)}
                                        className="relative min-h-0 basis-[calc(9rem*1.414)] flex-grow-0 flex-shrink-0 w-36 rounded-md bg-gray-200 flex justify-center items-center text-lg capitalize cursor-pointer transition-all duration-300 hover:bg-gray-300 hover:text-xl overflow-hidden shadow-lg hover:shadow-xl"
                                    >
                                        <Image src={t.image ?? '/templatePlaceholder.png'} alt="template image" fill />
                                    </div>
                                ))
                            }
                            <div key="bottomEmptySpace" className="min-h-0 basis-[3.5rem] flex-grow-0 flex-shrink-0"></div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full z-10 bg-gradient-to-t from-[70%] from-neutral-100 p-2 px-4">
                    <button onClick={onPrevButtonClick}
                        className="h-12 bg-slate-600 border-2 border-solid w-full border-slate-500 stroke-white py-[12px] rounded-full grid justify-center items-center box-border transition-all duration-150 hover:border-[6px] hover:py-[6px]">
                        <svg className="w-full h-full" fill="none" viewBox="0 0 20 20">
                            <path strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"
                                d="M 1 6 l 9 8 l 9 -8"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

function Editor({ jsCode, cssCode, onChange, onApply, onDone }: {
    jsCode: string, cssCode: string, onChange: (js: string, type: 'js' | 'css') => void
    onApply: () => void, onDone: () => void
}) {
    const [type, setType] = useState<'js' | 'css'>('js');
    const [collapsed, setCollapsed] = useState(false)

    useEffect(() => {
        import('@babel/standalone');
    })

    return (
        <div className={`relative self-stretch flex-shrink-0 bg-[#282c34] flex py-1 px-1 overflow-hidden  max-w-[calc(100vw-1rem)] transition-all duration-300 ${collapsed ? "w-[5.25rem]" : "w-[60rem]"}`}>
            <div className="self-stretch flex flex-col w-full min-w-[min(calc(100vw-1.5rem),60rem)] flex-grow-1">
                <div className={`flex justify-between gap-2 px-4 transition-all delay-200 flex-wrap`}>
                    <div className="flex gap-0 items-center">
                        <button onClick={() => setCollapsed(!collapsed)} className={twMerge("relative flex gap-2 px-4 py-3 items-center rounded-full bg-neutral-100 mr-4")}>
                            <svg className="w-6 h-6" viewBox="0 0 48 48" preserveAspectRatio="xMinYMin meet">
                                <path d="M32.6,22.6a1.9,1.9,0,0,0,0,2.8l5.9,6a2.1,2.1,0,0,0,2.7.2,1.9,1.9,0,0,0,.2-3L38.8,26H44a2,2,0,0,0,0-4H38.8l2.6-2.6a1.9,1.9,0,0,0-.2-3,2.1,2.1,0,0,0-2.7.2Z" />
                                <path d="M15.4,25.4a1.9,1.9,0,0,0,0-2.8l-5.9-6a2.1,2.1,0,0,0-2.7-.2,1.9,1.9,0,0,0-.2,3L9.2,22H4a2,2,0,0,0,0,4H9.2L6.6,28.6a1.9,1.9,0,0,0,.2,3,2.1,2.1,0,0,0,2.7-.2Z" />
                                <path d="M26,6V42a2,2,0,0,0,4,0V6a2,2,0,0,0-4,0Z" />
                                <path d="M22,42V6a2,2,0,0,0-4,0V42a2,2,0,0,0,4,0Z" />
                            </svg>

                        </button>
                        <button onClick={() => setType('js')} className={twMerge("relative flex gap-2 px-6 pr-4 py-3 items-center rounded-l-full bg-neutral-500", type == 'js' && 'bg-[#c7b200]')}>
                            <svg className="w-6 h-6" viewBox="0 0 256 256" preserveAspectRatio="xMinYMin meet">
                                <path d="M0 0h256v256H0V0z" fill="#F7DF1E"></path>
                                <path d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247L210.29 147.43c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574"></path>
                            </svg>

                        </button>
                        <button onClick={() => setType('css')} className={twMerge("relative flex gap-2 px-6 pl-4 py-3 items-center rounded-r-full bg-neutral-500", type == 'css' && 'bg-[#aaa8ff]')}>
                            <svg className="w-6 h-6" viewBox="0 0 512 512" preserveAspectRatio="xMinYMin meet">
                                <path fill="#264de4" d="M72 460L30 0h451l-41 460-184 52" />
                                <path fill="#2965f1" d="M256 37V472l149-41 35-394" />
                                <path fill="#ebebeb" d="m114 94h142v56H119m5 58h132v57H129m3 28h56l4 45 64 17v59L139 382" />
                                <path fill="#ffffff" d="m256 208v57h69l-7 73-62 17v59l115-32 26-288H256v56h80l-5.5 58Z" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex items-center ml-auto py-1">
                        <button onClick={onApply}
                            className="p-2 px-8 pr-6 rounded-l-full transition-all hover:bg-neutral-100 text-lg bg-neutral-300 text-black border-0 border-r border-solid">run</button>
                        <button onClick={onDone}
                            className="p-2 px-8 pl-6 rounded-r-full transition-all hover:bg-neutral-100 text-lg bg-neutral-300 text-black">done</button>
                    </div>
                </div>

                <div className="flex-grow relative overflow-hidden">
                    <ReactCodeMirror
                        className="absolute top-0 left-0 w-full h-full text-base custom-scrollbar"
                        value={type == 'js' ? jsCode : cssCode}
                        height="100%"
                        theme={'dark'}
                        onChange={(v) => onChange(v, type)}
                        extensions={type == 'js' ? [javascript({ jsx: true })] : [css()]}
                    />
                </div>
            </div>
        </div>
    )
}

export default ResumeUI