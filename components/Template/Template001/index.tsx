import { DataScheme, EducationEntry, ExperienceEntry, ProjectEntry } from "@/machines/types";
import React from "react";



export default function Template({ data }: { data: DataScheme }) {
    return (
        <>
            <Me basics={data.basics} />
            <div className="flex content">
                <Side data={data} />
                <Main data={data} />
            </div>
        </>
    )
}

function Me({ basics }: { basics: DataScheme['basics'] }) {
    return (
        <div className="flex gap-8 p-6 font-[family-name:var(--font-alice)]">
            <img src={basics.image} className="object-cover h-24 w-24 border border-green-700 rounded-full" />
            <div className="flex flex-col justify-center">
                <h1 className={`text-4xl font-bold capitalize`}>{basics.name}</h1>
                <h2 className="text-xl font-bold text-[#666] capitalize">{basics.title}</h2>
            </div>
            <div className="flex flex-col justify-center ml-auto">
                <h3 key="address" className="text-xl text-[#222] text-end"> {basics.address}</h3>
                <h3 key="email" className="text-xl text-[#222] text-end"> {basics.email}</h3>
                <h3 key="phone" className="text-xl text-[#222] text-end"> {basics.phone}</h3>
            </div>
        </div>
    )
}

function Side({ data }: { data: DataScheme }) {
    return (
        <div className="column flex flex-col pl-3 px-1 gap-4 w-[60mm] font-[family-name:var(--font-alice)] flex-shrink-0">
            <Links links={data.links} />
            <Skills skills={data.skills} />
            <Languages languages={data.languages} />
        </div>
    )
}

function Main({ data }: { data: DataScheme }) {
    const experience = data.experience.data.filter(e => e.enabled)
    const projects = data.projects.data.filter(p => p.enabled)
    const educations = data.education.data.filter(e => e.enabled)
    return (
        <div className="column flex flex-col font-[family-name:var(--font-alice)] pe-1">
            {
                data.basics.summary.enabled ?
                    data.basics.summary.data ?
                        <section>
                            <Segment landmark={<Dot className="w-4 h-4 bg-blue-800" />} lineClassName="bg-blue-700" fullLine={false}>
                                <h2 className="text-3xl leading-tight font-bold">Summary</h2>
                            </Segment>
                            <Segment lineClassName="bg-gradient-to-b from-blue-700 to-green-700">
                                <p className="pt-2">{data.basics.summary.data}</p>
                            </Segment>
                            <EmptySegment className="h-3" lineClassName="bg-green-700" />
                        </section> :
                        <Segment landmark={<Dot className="w-4 h-4 bg-yellow-600" />}>
                            <NotYetSet>Summary Not Yet Set</NotYetSet>
                        </Segment> : ''
            }
            {
                data.projects.enabled ?
                    projects.length ?
                        <section>
                            <Segment landmark={<Dot className="w-4 h-4 bg-green-800" />} lineClassName="bg-green-700">
                                <h2 className="text-3xl leading-tight font-bold">Projects</h2>
                            </Segment>
                            <div className="flex flex-col">
                                {
                                    projects.map((p, i) => (
                                        <Project key={p.startDate} project={p} />
                                    ))
                                }
                            </div>
                        </section> :
                        <Segment landmark={<Dot className="w-4 h-4 bg-yellow-600" />}>
                            <NotYetSet>Projects Not Yet Set</NotYetSet>
                        </Segment> : ""
            }
            {
                data.experience.enabled ?
                    experience.length ?
                        <section>
                            <Segment landmark={<Dot className="w-4 h-4 bg-green-800" />} lineClassName="bg-green-700">
                                <h2 className="text-3xl leading-tight font-bold">Experience</h2>
                            </Segment>
                            <div className="flex flex-col">
                                {
                                    experience.map((e, i) => (
                                        <Experience key={e.startDate} exp={e} />
                                    ))
                                }
                            </div>
                        </section> :
                        <Segment landmark={<Dot className="w-4 h-4 bg-yellow-600" />}>
                            <NotYetSet>Experience Not Yet Set</NotYetSet>
                        </Segment> : ""
            }
            {
                data.education.enabled ?
                    educations.length ?
                        <section key="languages">
                            <EmptySegment className="h-3" />
                            <Segment landmark={<Dot className="w-4 h-4 bg-blue-800" />}>
                                <h2 className="text-3xl leading-tight font-bold">Education</h2>
                            </Segment>
                            <div className="flex flex-col">
                                {
                                    educations.map((edu) => (
                                        <Education key={edu.startDate} education={edu} />
                                    ))
                                }
                            </div>
                        </section> :
                        <Segment landmark={<Dot className="w-4 h-4 bg-yellow-600" />}>
                            <NotYetSet>Education Not Yet Set</NotYetSet>
                        </Segment>
                    : ''
            }
        </div>
    )
}


function Links({ links }: { links: DataScheme['links'] }) {
    const data = links.data.filter(l => l.enabled)
    return (
        links.enabled && data.length ?
            <section key="links" className="flex gap-2 flex-wrap">
                {
                    data.map(link => (
                        <a key={link.name} href={link.url} target="_blank" className="font-[family-name:var(--font-alice)] flex items-center gap-2 text-[#333] text-xl">
                            <img src={link.icon} className="w-6 h-6 object-contain rounded-md" alt={link.name} />/
                            <span> {link.userId}</span>
                        </a>
                    ))
                }
            </section> : <NotYetSet>Links Not Yet Set</NotYetSet>

    )
}

function Skills({ skills }: { skills: DataScheme['skills'] }) {
    const softwareSkills = skills.data.filter(s => s.enabled && s.category == "Software & IT Skill")
    const otherSkills = skills.data.filter(s => s.enabled && s.category != "Software & IT Skill")
    return skills.enabled ? (
        <>
            {
                softwareSkills.length ?
                    <section key="software-skills">
                        <header>
                            <h2 className="text-[1.75rem] leading-tight font-bold">Software / IT</h2>
                        </header>
                        <div className="flex gap-2 flex-wrap font-[family-name:var(--font-roboto)] mt-1">
                            {
                                softwareSkills.map(skill => (
                                    <React.Fragment key={skill.name + skill.rating}>
                                        <div className="flex gap-2 px-2 py-1 rounded-full border border-solid border-[#333] text-[#333] text-base">
                                            {skill.icon && <img src={skill.icon} className="w-6 h-6 object-contain rounded-lg" />}
                                            {skill.name}
                                        </div>
                                    </React.Fragment>
                                ))
                            }
                        </div>
                    </section> : ''
            }
            {
                otherSkills.length ?
                    <section key="other-skills">
                        <header>
                            <h2 className="text-[1.75rem] leading-tight font-bold">Skills</h2>
                        </header>
                        <div className="flex flex-wrap mt-1 ml-4">
                            {
                                otherSkills.map(skill => (
                                    <div key={skill.name + skill.rating} className="flex gap-2 text-[#333] text-lg font-medium">
                                        <Dot className="h-2 w-2" />
                                        {skill.name}
                                    </div>
                                ))
                            }
                        </div>
                    </section> : <NotYetSet>Skills Not Yet Set</NotYetSet>

            }
        </>
    ) : null
}

function Languages({ languages }: { languages: DataScheme['languages'] }) {
    const data = languages.data.filter(l => l.enabled)
    return (
        languages.enabled ?
            data.length ?
                <section key="languages">
                    <header>
                        <h2 className="text-[1.75rem] leading-tight font-bold">Languages</h2>
                    </header>
                    <div className="flex flex-col mt-1 ml-4">
                        {
                            data.map((lang) => (
                                <div key={lang.name} className="flex flex-col gap-1 text-[#333] text-lg font-medium">
                                    <div>{lang.name}</div>
                                    <div className="h-[4px] bg-gray-300 rounded-full overflow-hidden">
                                        <div className="w-[var(--w)] h-full bg-yellow-600 rounded-full"
                                            style={{ '--w': `${lang.rating * 10}%` } as React.CSSProperties}
                                        ></div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </section> : <NotYetSet>Languages Not Yet Set</NotYetSet>
            : null
    )
}

/**
 * Experience contains:
 *      enabled?: boolean
 *      position: string,
 *      company: string,
 *      location: string,
 *      startDate: string,
 *      endDate: string,
 *      description: string,
 *      bulletPoints: string[],
 *      technologies: TechnologyEntry[]
 * 
 */
function Experience({ exp }: { exp: ExperienceEntry }) {
    return (
        <div className="flex flex-col">
            <EmptySegment className="h-3" lineClassName="bg-green-700" />
            <Segment landmark={<Dot className="h-3 w-3 bg-white border-2 border-green-700" />} lineClassName="bg-green-700">
                <h2 className="text-xl leading-tight font-semibold">
                    {exp.position} | {exp.company}
                </h2>
            </Segment>
            <Segment lineClassName="bg-green-700">
                <div className="flex flex-col">
                    <h3 className="text-lg leading-tight">
                        <span className="font-semibold">{exp.startDate}</span> to <span className="font-semibold">{exp.endDate}</span> | {exp.location}
                    </h3>
                    {
                        exp.technologies.length &&
                        <div className="flex items-center gap-2 pt-2">
                            {
                                exp.technologies.map((t, i) => (
                                    <div key={t.name} className="flex gap-2 rounded-full border border-solid border-[#ccc] justify-center items-center px-2 py-1">
                                        <img className="w-4 h-4 object-contain rounded-sm" src={t.icon} />
                                        {t.name}
                                    </div>
                                ))
                            }
                        </div>
                    }
                    {
                        exp.bulletPoints.length &&
                        <ul className="mt-1 ml-4 list-disc">
                            {
                                exp.bulletPoints.map((bp, i) => (
                                    <li key={'bp' + i} className="text-[#333] text-base font-medium">
                                        {bp}
                                    </li>
                                ))
                            }
                        </ul>
                    }
                </div>
            </Segment>
        </div>
    )
}

/**
 * Experience contains:
 *      enabled?: boolean
 *      name: string,
 *      startDate: string,
 *      endDate: string,
 *      description: string,
 *      bulletPoints: string[],
 *      technologies: TechnologyEntry[]
 * 
 */
function Project({ project }: { project: ProjectEntry }) {
    return (
        <div className="flex flex-col">
            <EmptySegment className="h-3" lineClassName="bg-green-700" />
            <Segment landmark={<Dot className="h-3 w-3 bg-white border-2 border-green-700" />} lineClassName="bg-green-700">
                <h2 className="text-xl leading-tight font-semibold">
                    {project.name}
                </h2>
            </Segment>
            <Segment lineClassName="bg-green-700">
                <div className="flex flex-col">
                    <h3 className="text-lg leading-tight">
                        <span className="font-semibold">{project.startDate}</span> to <span className="font-semibold">{project.endDate}</span>
                    </h3>
                    {
                        project.technologies.length &&
                        <div className="flex items-center gap-2 pt-2">
                            {
                                project.technologies.map((t, i) => (
                                    <div key={t.name} className="flex gap-2 rounded-full border border-solid border-[#ccc] justify-center items-center px-2 py-1">
                                        <img className="w-4 h-4 object-contain rounded-sm" src={t.icon} />
                                        {t.name}
                                    </div>
                                ))
                            }
                        </div>
                    }
                    {
                        project.description &&
                        <p>
                            {project.description}
                        </p>
                    }
                    {
                        project.bulletPoints.length &&
                        <ul className="mt-1 ml-4 list-disc">
                            {
                                project.bulletPoints.map((bp, i) => (
                                    <li key={'bp' + i} className="text-[#333] text-base font-medium">
                                        {bp}
                                    </li>
                                ))
                            }
                        </ul>
                    }
                </div>
            </Segment>
        </div>
    )
}

/* 
    Education Entry contains
    {
        enabled?: boolean,
        degree: string,
        university: string,
        location: string,
        startDate: string,
        endDate: string,
        bulletPoints: string[]
    }
*/
function Education({ education }: { education: EducationEntry }) {
    return (
        <>
            <div className="flex flex-col">
                <EmptySegment className="h-3" />
                <Segment landmark={<Dot className="h-[.6rem] w-[.6rem] bg-white border-2 border-solid border-black" />}>
                    <h2 className="text-xl leading-tight font-semibold">
                        {education.degree} | {education.university}
                    </h2>
                </Segment>
                <Segment>
                    <h3 className="text-lg leading-tight">
                        <span className="font-semibold">{education.startDate}</span> to <span className="font-semibold">{education.endDate}</span> | {education.location}
                    </h3>
                </Segment>
            </div>
        </>
    )
}


// 
const NotYetSet = ({ children }: { children: React.ReactNode }) => {
    return (
        <h1 className="text-xl font-bold bg-[length:500%] bg-gradient-to-r from-blue-600 via-red-700 to-indigo-600 bg-clip-text text-transparent text-shine" style={{ WebkitBackgroundClip: 'text' } as React.CSSProperties}>
            {children}
        </h1>
    )
}

const Dot = ({ className = "w-4 h-4" }: { className?: string }) => (
    <div className="col-start-1 row-start-1 flex justify-center items-center">
        <div className={`rounded-full bg-black ${className}`}></div>
    </div>
)

function Segment({ children, landmark, lineClassName = "bg-black", fullLine = true }: {
    children: React.ReactNode,
    landmark?: React.ReactNode,
    lineClassName?: string,
    fullLine?: boolean
}) {
    return (
        <div className="flex gap-2">
            <div className="relative w-6 flex-shrink-0 grid grid-cols-1 grid-rows-1">
                <div className="col-start-1 row-start-1 flex justify-center">
                    <div className={`w-[2px] ${fullLine ? 'h-full' : 'h-1/2 mt-auto'} ${lineClassName}`}></div>
                </div>
                {landmark}
            </div>
            {children}
        </div>
    )
}

function EmptySegment({ className = 'h-2', lineClassName = "bg-black" }: {
    className?: string,
    lineClassName?: string
}) {
    return (
        <div className="flex gap-2">
            <div className="relative w-6 flex-shrink-0 grid grid-cols-1 grid-rows-1">
                <div className="col-start-1 row-start-1 flex justify-center">
                    <div className={`w-[2px] h-full ${lineClassName}`}></div>
                </div>
            </div>
            <div className={className}></div>
        </div>
    )
}