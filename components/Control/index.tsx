
import React, { useState, JSX } from 'react';
import Basics from './Basics';
import SocialLinks from './SocialLinks';
import Experience from './Experience';

const categories = [
    {
        name: "Basics",
        top: -12.25,
        form: <Basics />
    },
    {
        name: "Social Links",
        top: -16.25,
        form: <SocialLinks />
    },
    {
        name: "Experience",
        top: -20.25,
        form: <Experience />
    },
    {
        name: "Education",
        top: -24.25,
        form: <Basics />
    },
    {
        name: "Skills",
        top: -28.25,
        form: <Basics />
    },
]

export default function Control() {
    const [collapsed, setCollapsed] = useState(false);
    const [shownCat, setShownCat] = useState<{name: string, top: number, form: JSX.Element} | null>(null);

    function onCloseHandler() {
        setCollapsed(true)
        setShownCat(null)
    }

    return (
        <div id="control" className={collapsed ? 'collapsed' : ''} >
            <header className={`flex items-center bg-[#263f3f] top-0 left-0 ${collapsed?'static h-16 w-16 justify-center p-0':'absolute w-full h-[4.25rem] p-4'}`}>
                <button 
                    id="open"
                    className={`h-10 w-10 fill-none stroke-[#eee] stroke-2 p-2 ${collapsed?'flex':'hidden'}`}
                    onClick={() => setCollapsed(false)}
                >
                    <svg viewBox="0 0 20 20">
                        <path d="M 2 1 L 6 1 C 6.583 1.004 6.997 1.424 7 2 L 7 18 C 6.997 18.594 6.565 19.002 6 19 L 2 19 C 1.412 19.002 1.003 18.588 1 18 L 1 14 C 0.998 13.394 1.337 13.003 2 13 L 18 13 C 18.599 13.002 19.002 13.434 19 14 L 19 18 C 19.001 18.57 18.581 18.996 18 19 L 14 19 C 13.371 19.002 13.002 18.518 13 18 L 13 2 C 13.002 1.436 13.417 0.998 14 1 L 18 1 C 18.564 0.998 19.002 1.418 19 2 L 19 6 C 18.996 6.554 18.553 7.003 18 7 L 2 7 C 1.401 6.997 0.998 6.566 1 6 L 1 2 C 1.003 1.476 1.476 1.004 2 1 Z"></path>
                    </svg>
                </button>
                <button
                    id="back"
                    className={`h-10 w-10 fill-none stroke-[#ddd] stroke-[3] p-2 mr-auto transition-all duration-300 ease-[cubic-bezier(0.68, -0.6, 0.32, 1.6)] ${shownCat?'opacity-100':'opacity-0 -translate-x-12'} ${collapsed?'hidden':'flex'}`}
                    onClick={() => setShownCat(null)}
                >
                    <svg viewBox="0 0 24 24" strokeLinecap='round' strokeLinejoin='round'>
                        <path d="M 12 2 L 2 12 L 12 22 M 2 12 L 22 12">
                        </path>
                    </svg>
                </button>
                <div 
                    className={`text-[2rem] font-light text-[#eee] relative transition-all duration-300 ease-[cubic-bezier(0.165,0.84,0.44,1)] ${shownCat?'opacity-100 top-0':'opacity-0 -top-12'} ${collapsed && 'hidden'}`}
                >
                    {shownCat?.name}
                </div>
                <button
                    id="close"
                    className={`h-10 w-10 fill-none stroke-[#ddd] stroke-[3] p-2 ml-auto transition-all duration-300 ease-[cubic-bezier(0.68, -0.6, 0.32, 1.6)] ${collapsed?'hidden':'flex'}`}
                    onClick={onCloseHandler}
                >
                    <svg viewBox="0 0 24 24" strokeLinecap='round' strokeLinejoin='round'>
                        <path d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001">
                        </path>
                    </svg>
                </button>
            </header>

            {
                collapsed ||
                <div className="list-wrapper">
                    <ul className="list">
                        {
                            categories.map((cat, idx) =>
                                <li
                                    key={idx}
                                    className={shownCat?"hidden":undefined}
                                    onClick={() => setShownCat(cat)}
                                    style={{ '--delay': `${idx * .08 + .3}s` } as React.CSSProperties}
                                >
                                    <span>{ cat.name }</span>
                                    <div></div>
                                </li>
                            )
                        }
                    </ul>
                </div>
            }
            <div id="content" className={shownCat ? "visible" : ""}>
                <div className="custom-scrollbar overflow-auto h-full w-full text-[#222]">
                    {shownCat && shownCat.form}
                </div>
            </div>

        </div>
    )
}