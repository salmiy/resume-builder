'use client';
import React, { ChangeEvent } from 'react';
import { useMachineEmitter, useMachineStore } from '@/context/machineContexts';
import { DataScheme } from '@/machines/types';
import ControlCenter from './ControlCenter';
import Button from '../Button';



export default function Panel() {
    const resumeData = useMachineStore()
    const emit = useMachineEmitter()

    function exportJson() {
        const blob = new Blob([JSON.stringify(resumeData)], { type: 'text/plain' });
        const elm = document.createElement('a')
        elm.href = window.URL.createObjectURL(blob);
        elm.download = `resumeData:${resumeData.basics.name}.json`;
        elm.style.visibility = 'hidden'
        elm.style.zIndex = '-1111'
        elm.style.position = 'absolute'
        document.body.prepend(elm)
        elm.click()
        elm.remove()
    }
    function importJson(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target?.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = () => {
            const data: DataScheme = JSON.parse(reader.result as string)
            emit?.({ type: 'load', value: data })
        };
        reader.onerror = () => {
            console.log(reader.error)
        };
        reader.readAsText(file);
    }


    return (
        <div className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 flex flex-col-reverse sm:flex-row gap-7 items-start sm:items-end print:hidden">
            <ControlCenter />
            {/* export */}
            <Button onClick={exportJson} text='export your data'>
                <svg viewBox="0 0 20 20" className='h-full w-full'>
                    <path d="M 8 5 C 8 4.448 8.448 4 9 4 L 14 4 C 15.105 4 16 4.895 16 6 L 16 11 C 16 11.552 15.552 12 15 12 C 14.448 12 14 11.552 14 11 L 14 8.621 C 14 8.176 13.461 7.953 13.146 8.268 L 10.121 11.293 C 9.731 11.683 9.098 11.683 8.707 11.293 C 8.317 10.902 8.317 10.269 8.707 9.879 L 11.732 6.854 C 12.047 6.539 11.824 6 11.379 6 L 9 6 C 8.448 6 8 5.552 8 5 L 8 5 Z M 2 3 C 2 2.448 2.448 2 3 2 L 17 2 C 17.552 2 18 2.448 18 3 L 18 17 C 18 17.552 17.552 18 17 18 L 9 18 C 8.448 18 8 17.552 8 17 L 8 14 C 8 12.895 7.105 12 6 12 L 3 12 C 2.448 12 2 11.552 2 11 L 2 3 Z M 20 2 C 20 0.895 19.105 0 18 0 L 2 0 C 0.895 0 0 0.895 0 2 L 0 18 C 0 19.105 0.895 20 2 20 L 18 20 C 19.105 20 20 19.105 20 18 L 20 2 Z"></path>
                </svg>
            </Button>
            {/* import */}
            <label className="group relative h-16 w-16  fill-[#eee] stroke-none stroke-2 flex cursor-pointer" >
                <div className='relative h-full w-full p-5 z-10 bg-yellow-700 rounded-full shadow'>
                    <svg viewBox="0 0 20 20" className='h-full w-full'>
                        <path d="M 11 14 L 8.621 14 C 8.176 14 7.953 13.461 8.268 13.146 L 11.293 10.121 C 11.683 9.731 11.683 9.098 11.293 8.707 C 10.902 8.317 10.269 8.317 9.879 8.707 L 6.854 11.732 C 6.539 12.047 6 11.824 6 11.379 L 6 9 C 6 8.448 5.552 8 5 8 C 4.448 8 4 8.448 4 9 L 4 14 C 4 15.105 4.895 16 6 16 L 11 16 C 11.552 16 12 15.552 12 15 C 12 14.448 11.552 14 11 14 L 11 14 Z M 18 17 C 18 17.552 17.552 18 17 18 L 3 18 C 2.448 18 2 17.552 2 17 L 2 3 C 2 2.448 2.448 2 3 2 L 11 2 C 11.552 2 12 2.448 12 3 L 12 6 C 12 7.105 12.895 8 14 8 L 17 8 C 17.552 8 18 8.448 18 9 L 18 17 Z M 18 0 L 2 0 C 0.895 0 0 0.895 0 2 L 0 18 C 0 19.105 0.895 20 2 20 L 18 20 C 19.105 20 20 19.105 20 18 L 20 2 C 20 0.895 19.105 0 18 0 L 18 0 Z"></path>
                    </svg>
                </div>
                <div className="font-[family-name:var(--font-ibm-plex-mono)] h-4 w-4 absolute bottom-1/2 left-1/2 -translate-x-1/2">
                    {
                        'import your data'.split('').map((l, i, a) => (
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
                <input type='file' className='hidden' onChange={importJson} />
            </label>
            {/* print */}
            <Button onClick={() => { window?.print() }} text="print resume">
                <svg viewBox="0 0 20 20" className='h-full w-full'>
                    <path d="M 18 15.5 C 18 15.776 17.776 16 17.5 16 L 17 16 L 17 12 L 3 12 L 3 16 L 2.5 16 C 2.224 16 2 15.776 2 15.5 L 2 9 C 2 8.448 2.448 8 3 8 L 17 8 C 17.552 8 18 8.448 18 9 L 18 15.5 Z M 15 17 C 15 17.552 14.552 18 14 18 L 6 18 C 5.448 18 5 17.552 5 17 L 5 14 L 15 14 L 15 17 Z M 4 3 C 4 2.448 4.448 2 5 2 L 15 2 C 15.552 2 16 2.448 16 3 L 16 6 L 4 6 L 4 3 Z M 18 6 L 18 2 C 18 0.895 17.105 0 16 0 L 4 0 C 2.895 0 2 0.895 2 2 L 2 6 C 0.895 6 0 6.895 0 8 L 0 16 C 0 17.104 0.895 18 2 18 L 3 18 C 3 19.104 3.895 20 5 20 L 15 20 C 16.105 20 17 19.104 17 18 L 18 18 C 19.105 18 20 17.104 20 16 L 20 8 C 20 6.895 19.105 6 18 6 L 18 6 Z"></path>
                </svg>
            </Button>
            {/* create template */}
            <Button onClick={() => emit?.({ type: 'createTemplate' })} bgClass='bg-blue-700' text="create template">
                <svg viewBox="0 0 21 20" className='h-full w-full'>
                    <path d="M 14.7 10 C 14.7 10.552 14.2296 11 13.65 11 L 11.55 11 L 11.55 13 C 11.55 13.552 11.0796 14 10.5 14 C 9.9204 14 9.45 13.552 9.45 13 L 9.45 11 L 7.35 11 C 6.7704 11 6.3 10.552 6.3 10 C 6.3 9.448 6.7704 9 7.35 9 L 9.45 9 L 9.45 7 C 9.45 6.448 9.9204 6 10.5 6 C 11.0796 6 11.55 6.448 11.55 7 L 11.55 9 L 13.65 9 C 14.2296 9 14.7 9.448 14.7 10 M 10.5 18 C 5.8684 18 2.1 14.411 2.1 10 C 2.1 5.589 5.8684 2 10.5 2 C 15.1316 2 18.9 5.589 18.9 10 C 18.9 14.411 15.1316 18 10.5 18 M 10.5 0 C 4.7009 0 0 4.477 0 10 C 0 15.523 4.7009 20 10.5 20 C 16.2991 20 21 15.523 21 10 C 21 4.477 16.2991 0 10.5 0"></path>
                </svg>
            </Button>
        </div>
    )
}

