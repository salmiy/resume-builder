'use client';
import { useMachineStore } from "@/context/machineContexts";
import { DataScheme } from "@/machines/types";
import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from '@codemirror/lang-javascript';
import { less } from '@codemirror/lang-less';
import React, { useEffect, useRef, useState } from "react";
import { StateValue } from "xstate";
import useEmblaCarousel from "embla-carousel-react";
import { useEmblaButtons } from "@/context/EmblaCarousel";
import Template001 from "./Template001";
import Template002 from "./002";
import { findStyleSheetByTitle, changeStyleSheetSelectors } from "./utils"
import { defaultCssCode, defaultJsCode } from "./defaults";
import { Alice, Roboto } from "next/font/google";

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
type TemplateEntry = { Template: TemplateType }



const templates = [
    { Template: Template001 },
    { Template: Template002 },
    { Template: Template002 },
    { Template: Template002 },
    { Template: Template002 },
    { Template: Template002 },
    { Template: Template002 },
    { Template: Template002 },
    { Template: Template002 },
    { Template: Template002 },
    { Template: Template002 },
    { Template: Template002 },
]


function ResumeUI({ mstate, emit }: { mstate: StateValue, emit: any }) {
    const data: DataScheme = useMachineStore();
    const styleRef = useRef<HTMLStyleElement>(null)
    const [template, setTemplate] = useState({ Template: Template001 })
    const [editorTemplate, setEditorTemplate] = useState<TemplateEntry | undefined>(undefined)
    const [code, setCode] = useState({ js: defaultJsCode, css: defaultCssCode });
    const [compiling, setCompiling] = useState(false)

    async function applyTemplate() {
        setCompiling(true);
        const Babel = await import('@babel/standalone')
        await new Promise((resolve, reject) => { setTimeout(resolve, 1000) })
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
        <div className="flex gap-4 min-h-screen min-w-screen max-h-screen max-w-full overflow-auto print:p-0 print:block">
            {mstate == 'templateDeveloping' &&
                <div className="relative self-stretch flex py-1 px-1">
                    <Editor js={code.js} css={code.css} onChange={onCodeChange}
                        onApply={applyTemplate} onDone={() => emit?.({ type: 'developingFinished' })}
                    />
                    {compiling && <Compiling />}
                </div>
            }
            <div className="flex flex-grow">
                <div className="justify-between flex-grow flex gap-4 items-start">
                    <div key="page" id="resumeUI" className={`${alice.variable} ${roboto.variable} m-auto box-content border border-neutral-300 print:border-none`}>
                        <template.Template data={data} />
                    </div>
                    {mstate == 'templateDeveloping' ||
                        <TemplatesCarousel
                            templates={templates}
                            customTemplate={editorTemplate}
                            onTemplateClick={t => setTemplate(t)} />
                    }
                </div>
            </div>
            <style title="customResumeCss" ref={styleRef}></style>
        </div>
    )
}

const Compiling = () => (
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

function TemplatesCarousel({ templates, onTemplateClick, customTemplate }: {
    templates: TemplateEntry[],
    onTemplateClick: (template: TemplateEntry) => void,
    customTemplate?: TemplateEntry
}) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, axis: 'y', dragFree: true })
    const { onPrevButtonClick, onNextButtonClick } = useEmblaButtons(emblaApi)

    return (
        <div className="relative self-stretch w-[calc(12rem/1.414+2rem)] bg-neutral-100 flex flex-col gap-2 print:hidden">
            <div className="absolute top-0 left-0 w-full z-10 bg-gradient-to-b from-[70%] from-neutral-200 p-2 px-4">
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
                    <div className="flex flex-col gap-4 justify-centerf h-full max-h-full">
                        <div key="topEmptySpace" className="min-h-0 basis-[3.5rem] flex-grow-0 flex-shrink-0"></div>
                        {customTemplate &&
                            <div key={'customtemplate'} onClick={() => onTemplateClick(customTemplate)} className="group flex flex-col gap-0 cursor-pointer">
                                <div
                                    className="min-h-0 basis-[12rem] flex-grow-0 flex-shrink-0 w-[calc(12rem/1.414)] rounded-md bg-yellow-600   transition-all duration-300 group-hover:bg-yellow-500"
                                ><img src="https://plasma.coveo.com/assets/CodeEditor-Bu-pz_XT.png" className="w-full h-full object-contain" /></div>
                                <div className="text-lgf capitalize text-center">Editor template</div>
                            </div>
                        }
                        {
                            templates.map((t, i) => (
                                <div key={'template' + i} onClick={() => onTemplateClick(t)}
                                    className="min-h-0 basis-[12rem] flex-grow-0 flex-shrink-0 w-[calc(12rem/1.414)] rounded-md bg-gray-200 flex justify-center items-center text-lg capitalize cursor-pointer transition-all duration-300 hover:bg-gray-300 hover:text-xl"
                                > {'template ' + i} </div>
                            ))
                        }
                        <div key="bottomEmptySpace" className="min-h-0 basis-[3.5rem] flex-grow-0 flex-shrink-0"></div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full z-10 bg-gradient-to-t from-[70%] from-neutral-200 p-2 px-4">
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
    )
}

function Editor({ js, css, onChange, onApply, onDone }: {
    js: string, css: string, onChange: (js: string, type: 'js' | 'css') => void
    onApply: () => void, onDone: () => void
}) {
    const [type, setType] = useState<'js' | 'css'>('js');

    useEffect(() => {
        import('@babel/standalone');
    })

    return (
        <div className="self-stretch flex flex-col w-[60rem] flex-grow-0">
            <div className="flex gap-2">
                <div className="flex gap-0 items-end">
                    <button onClick={() => setType('js')} className={`relative flex gap-2 px-6 py-2 text-lg items-center border border-solid border-[#aaa] rounded-tl-lg border-b-0 ${type == 'js' ? 'bg-gray-300' : ''}`}>
                        <svg className="w-6 h-6" viewBox="0 0 256 256" preserveAspectRatio="xMinYMin meet">
                            <path d="M0 0h256v256H0V0z" fill="#F7DF1E"></path>
                            <path d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247L210.29 147.43c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574"></path>
                        </svg>
                        JavaScript
                    </button>
                    <button onClick={() => setType('css')} className={`relative flex gap-2 px-6 py-2 text-lg items-center border border-solid border-[#aaa] rounded-tr-lg border-l-0 border-b-0 ${type == 'css' ? 'bg-gray-300' : ''}`}>
                        <svg className="w-6 h-6" viewBox="0 0 512 512" preserveAspectRatio="xMinYMin meet">
                            <path fill="#264de4" d="M72 460L30 0h451l-41 460-184 52" />
                            <path fill="#2965f1" d="M256 37V472l149-41 35-394" />
                            <path fill="#ebebeb" d="m114 94h142v56H119m5 58h132v57H129m3 28h56l4 45 64 17v59L139 382" />
                            <path fill="#ffffff" d="m256 208v57h69l-7 73-62 17v59l115-32 26-288H256v56h80l-5.5 58Z" />
                        </svg>
                        CSS
                    </button>
                </div>
                <div className="flex gap-2 ml-auto py-1">
                    <button onClick={onApply}
                        className="p-2 px-8 rounded-full transition-all hover:bg-gray-300 text-lg border border-solid border-[#aaa]">Apply</button>
                    <button onClick={onDone}
                        className="p-2 px-8 rounded-full transition-all hover:bg-gray-300 text-lg border border-solid border-[#aaa]">Done</button>
                </div>
            </div>
            <div className="flex-grow relative rounded-3xl rounded-tl-none overflow-hidden">
                <ReactCodeMirror
                    className="absolute top-0 left-0 w-full h-full text-xl custom-scrollbar"
                    value={type == 'js' ? js : css}
                    height="100%"
                    theme={'dark'}
                    onChange={(v) => onChange(v, type)}
                    extensions={type == 'js' ? [javascript({ jsx: true })] : [less()]}
                />
            </div>

        </div>
    )
}

export default ResumeUI