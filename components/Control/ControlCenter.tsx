import React, { useState, JSX } from 'react';
import Basics from './Basics';
import SocialLinks from './SocialLinks';
import Experience from './Experience';
import Skills from './Skills';
import Languages from './Languages';
import Hobbies from './Hobbies';
import Education from './Education';
import Projects from './Projects';

import Button from '@/components/Button';
import { twMerge } from 'tailwind-merge';


interface Category {
    name: string,
    component: JSX.Element
}
interface CategoryProps {
    cat: Category,
    order: number, 
    show: boolean,
    onClick: () => void
}

const categories: Category[] = [
    { name: "Basics", component: <Basics /> },
    { name: "Experience", component: <Experience /> },
    { name: "Projects", component: <Projects /> },
    { name: "Education", component: <Education /> },
    { name: "Skills", component: <Skills /> },
    { name: "Social Links", component: <SocialLinks /> },
    { name: "Languages", component: <Languages /> },
    { name: "Hobbies", component: <Hobbies /> },
]

function Category({ cat, show, onClick, order }: CategoryProps){
    return (
        <li
            className={twMerge(
                "group relative font-light cursor-pointer transition-all duration-[250ms] delay-[var(--delay)]",
                show && "opacity-0 delay-0"
            )}
            onClick={onClick}
            style={{ '--delay': `${order * .08 + .3}s` } as React.CSSProperties}
        >
            <span>{cat.name}</span>
            <div className='absolute bottom-[-2px] left-0 bg-[#eee] transition-all duration-300 h-[2px] w-0 group-hover:w-full'></div>
        </li>
    )
}

/*
width: 100vw;
    top: 1rem;
    right: 1rem;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
*/

export default function ControlCenter() {
    const [collapsed, setCollapsed] = useState(true);
    const [shownCat, setShownCat] = useState<Category | null>(null);

    function onCloseHandler() {
        setCollapsed(true)
        setShownCat(null)
    }

    return (
        <div id="control"
            className={`font-[family-name:var(--font-montserrat)] relative bg-[#263f3f] text-[#ddd] rounded-[2rem] transition-all duration-[400ms] delay-[50ms] ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] shadow z-20f ${collapsed ? 'grid justify-center items-center cursor-pointer h-16 w-16' : 'flex flex-col h-[30rem] w-[100vw] sm:w-[25rem] max-sm:top-4 max-sm:right-4 max-sm:rounded-b-none overflow-hidden'}`}
        >
            <header
                className={`flex items-center bgf-[#263f3f] top-0 left-0 ${collapsed ? 'static h-16 w-16 justify-center p-0' : 'absolute w-full h-[4.25rem] p-4'}`}
            >
                <Button onClick={() => setCollapsed(false)} className={collapsed ? 'flex text-black max-sm:[&_.label]:hidden' : 'hidden'} text='control center' bgClass='bg-[#263f3f]' stroke={true}>
                    <svg viewBox="0 0 20 20" className='h-full w-full'>
                        <path d="M 2 1 L 6 1 C 6.583 1.004 6.997 1.424 7 2 L 7 18 C 6.997 18.594 6.565 19.002 6 19 L 2 19 C 1.412 19.002 1.003 18.588 1 18 L 1 14 C 0.998 13.394 1.337 13.003 2 13 L 18 13 C 18.599 13.002 19.002 13.434 19 14 L 19 18 C 19.001 18.57 18.581 18.996 18 19 L 14 19 C 13.371 19.002 13.002 18.518 13 18 L 13 2 C 13.002 1.436 13.417 0.998 14 1 L 18 1 C 18.564 0.998 19.002 1.418 19 2 L 19 6 C 18.996 6.554 18.553 7.003 18 7 L 2 7 C 1.401 6.997 0.998 6.566 1 6 L 1 2 C 1.003 1.476 1.476 1.004 2 1 Z"></path>
                    </svg>
                </Button>
                <button
                    className={`group relative h-16 w-16  fill-none stroke-[#eee] stroke-2 ${collapsed ? 'hidden' : 'hidden'}`} onClick={() => setCollapsed(false)}>
                    <div className='relative h-full w-full p-5 z-10 bg-[#263f3f] rounded-full'>
                        <svg viewBox="0 0 20 20" className='h-full w-full'>
                            <path d="M 2 1 L 6 1 C 6.583 1.004 6.997 1.424 7 2 L 7 18 C 6.997 18.594 6.565 19.002 6 19 L 2 19 C 1.412 19.002 1.003 18.588 1 18 L 1 14 C 0.998 13.394 1.337 13.003 2 13 L 18 13 C 18.599 13.002 19.002 13.434 19 14 L 19 18 C 19.001 18.57 18.581 18.996 18 19 L 14 19 C 13.371 19.002 13.002 18.518 13 18 L 13 2 C 13.002 1.436 13.417 0.998 14 1 L 18 1 C 18.564 0.998 19.002 1.418 19 2 L 19 6 C 18.996 6.554 18.553 7.003 18 7 L 2 7 C 1.401 6.997 0.998 6.566 1 6 L 1 2 C 1.003 1.476 1.476 1.004 2 1 Z"></path>
                        </svg>
                    </div>
                    <div className={`font-[family-name:var(--font-ibm-plex-mono)] h-4 w-4 absolute bottom-1/2 left-1/2 -translate-x-1/2 text-[#333]`}>
                        {
                            'control center'.split('').map((l, i, a) => (
                                <div
                                    key={'letter' + i}
                                    className='absolute leading-none w-full bottom-0 left-0 h-0 text-lg font-semibold origin-[bottom_center] text-center -z-10 transition-all duration-300 rotate-[calc(160deg+var(--rot))] group-hover:h-14 group-hover:rotate-[var(--rot)] pointer-events-none'
                                    style={{ '--rot': (20 * (i - a.length / 2 + .5)) + 'deg' } as React.CSSProperties}
                                >
                                    {l}
                                </div>
                            ))
                        }
                    </div>
                </button>
                <button
                    id="back"
                    className={`h-10 w-10 fill-none stroke-[#ddd] stroke-[3] p-2 mr-auto transition-all duration-300 ease-[cubic-bezier(0.68, -0.6, 0.32, 1.6)] ${shownCat ? 'opacity-100' : 'opacity-0 -translate-x-12'} ${collapsed ? 'hidden' : 'flex'}`}
                    onClick={() => setShownCat(null)}
                >
                    <svg className='h-full w-full' viewBox="0 0 24 24" strokeLinecap='round' strokeLinejoin='round'>
                        <path d="M 12 2 L 2 12 L 12 22 M 2 12 L 22 12">
                        </path>
                    </svg>
                </button>
                <div
                    className={`text-[2rem] text-[#eee] relative transition-all duration-300 ease-[cubic-bezier(0.165,0.84,0.44,1)] ${shownCat ? 'opacity-100 top-0' : 'opacity-0 -top-12'} ${collapsed && 'hidden'}`}
                >
                    {shownCat?.name}
                </div>
                <button
                    id="close"
                    className={`h-10 w-10 fill-none stroke-[#ddd] stroke-[3] p-2 ml-auto transition-all duration-300 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] ${collapsed ? 'hidden' : 'flex'}`}
                    onClick={onCloseHandler}
                >
                    <svg className="h-full w-full" viewBox="0 0 24 24" strokeLinecap='round' strokeLinejoin='round'>
                        <path d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001">
                        </path>
                    </svg>
                </button>
            </header>

            {
                collapsed ||
                <div className={`custom-scrollbar px-12 py-24 flex flex-col items-center h-full overflow-x-hidden ${shownCat ? "overflow-y-hidden" : "overflow-y-auto"}`}>
                    <ul className="flex flex-col gap-8 text-4xl text-[#eee] flex-grow justify-center m-auto">
                        { 
                            categories.map((cat, idx) => (
                                <Category 
                                    key={`category${cat.name}`}
                                    cat={cat} order={idx} show={shownCat != null}
                                    onClick={() => setShownCat(cat)}  />)
                            )
                        }
                    </ul>
                </div>
            }
            <div className={`absolute top-[4.25rem] h-[calc(100%-4.25rem)] w-full flex-grow bg-[#eee] border-4 border-solid border-[#ccc] rounded-[2rem] transition-all duration-300 origin-bottom overflow-hidden ${shownCat ? "scale-100 opacity-100 delay-150" : "scale-0 opacity-0"}`}>
                <div className="custom-scrollbar overflow-auto h-full w-full text-[#222]">
                    {shownCat?.component}
                </div>
            </div>

        </div>
    )
}
