import { createMachine, assign, Actor } from "xstate";
import {
    DataScheme,
    EducationEntry,
    ExperienceEntry,
    HobbyEntry,
    LanguageEntry,
    ProjectEntry,
    SkillEntry,
    SocialLinkEntry
} from "./types";

type EventType = { type: 'createTemplate' }
    | { type: 'developingFinished' }
    | { type: 'load', value: DataScheme }
    | { type: 'basics.update', value: string, field: string }
    | { type: 'summary.enable', value: boolean }
    | { type: 'summary.update', value: string }
    | { type: 'experience.enable', value: boolean }
    | { type: 'experience.add', value: ExperienceEntry }
    | { type: 'experience.delete', value: number }
    | { type: 'experience.update', index: number, value: Partial<ExperienceEntry> }
    | { type: 'education.enable', value: boolean }
    | { type: 'education.add', value: EducationEntry }
    | { type: 'education.delete', value: number }
    | { type: 'education.update', index: number, value: Partial<EducationEntry> }
    | { type: 'projects.enable', value: boolean }
    | { type: 'project.add', value: ProjectEntry }
    | { type: 'project.delete', value: number }
    | { type: 'project.update', index: number, value: Partial<ProjectEntry> }
    | { type: 'links.enabled', value: boolean }
    | { type: 'link.add', value: SocialLinkEntry }
    | { type: 'link.update', id: string, value: Partial<SocialLinkEntry> }
    | { type: 'link.delete', id: string }
    | { type: 'hobbies.enabled', value: boolean }
    | { type: 'hobby.add', value: HobbyEntry }
    | { type: 'hobby.update', id: string, value: Partial<HobbyEntry> }
    | { type: 'hobby.delete', id: string }
    | { type: 'skills.enabled', value: boolean }
    | { type: 'skill.add', value: SkillEntry }
    | { type: 'skill.update', id: string, value: Partial<SkillEntry> }
    | { type: 'skill.delete', id: string }
    | { type: 'languages.enabled', value: boolean }
    | { type: 'language.add', value: LanguageEntry }
    | { type: 'language.update', id: string, value: Partial<LanguageEntry> }
    | { type: 'language.delete', id: string }


export const initialContext: DataScheme = {
    basics: {
        image: "https://eteflonline.com/wp-content/plugins/ld-dashboard/public/img/img_avatar.png",
        name: "john doe",
        email: "johndoe@contact.me",
        phone: "+212 6 12 34 56 78",
        address: "Tetouan, Morocco",
        title: "software engineer",
        summary: {
            enabled: true,
            data: "",
        }
    },
    experience: {
        enabled: true,
        data: []
    },
    education: {
        enabled: true,
        data: []
    },
    projects: {
        enabled: true,
        data: []
    },
    links: {
        enabled: true,
        data: []
    },
    skills: {
        enabled: true,
        data: []
    },
    languages: {
        enabled: true,
        data: []
    },
    hobbies: {
        enabled: true,
        data: []
    },
};

const resumeMachine = createMachine({
    id: "resume_data",
    initial: 'composingResume',
    types: {
        context: {} as DataScheme,
        events: {} as EventType
    },
    context: initialContext,
    on: {
        'load': {
            actions: assign(({ context, event }) => ({ ...context, ...event.value }))
        },
        'basics.update': {
            actions: assign({
                basics: ({ context, event }) => ({
                    ...context.basics,
                    [event.field]: event.value
                })
            })
        },
        'summary.enable': {
            actions: assign({
                basics: ({ context, event }) => ({
                    ...context.basics,
                    summary: {
                        ...context.basics.summary,
                        enabled: event.value
                    }
                })
            })
        },
        'summary.update': {
            actions: assign({
                basics: ({ context, event }) => ({
                    ...context.basics,
                    summary: {
                        ...context.basics.summary,
                        data: event.value
                    }
                })
            })
        },
        'experience.enable': {
            actions: assign({
                experience: ({ context, event }) => ({
                    ...context.experience,
                    enabled: event.value
                })
            })
        },
        'experience.add': {
            actions: assign({
                experience: ({ context, event }) => ({
                    ...context.experience,
                    data: [
                        ...context.experience.data,
                        { ...event.value, enabled: true }
                    ]
                })
            }),
        },
        'experience.delete': {
            actions: assign({
                experience: ({ context, event }) => ({
                    ...context.experience,
                    data: context.experience.data.filter((_, i) => i != event.value)
                })
            })
        },
        'experience.update': {
            actions: assign({
                experience: ({ context, event }) => ({
                    ...context.experience,
                    data: context.experience.data.map(
                        (e, i) => i != event.index ? e : { ...e, ...event.value }
                    )
                })
            })
        },
        'education.enable': {
            actions: assign({
                education: ({ context, event }) => ({
                    ...context.education,
                    enabled: event.value
                })
            })
        },
        'education.add': {
            actions: assign({
                education: ({ context, event }) => ({
                    ...context.education,
                    data: [
                        ...context.education.data,
                        { ...event.value, enabled: true }
                    ]
                })
            }),
        },
        'education.delete': {
            actions: assign({
                education: ({ context, event }) => ({
                    ...context.education,
                    data: context.education.data.filter((_, i) => i != event.value)
                })
            })
        },
        'education.update': {
            actions: assign({
                education: ({ context, event }) => ({
                    ...context.education,
                    data: context.education.data.map(
                        (e, i) => i != event.index ? e : { ...e, ...event.value }
                    )
                })
            })
        },
        'projects.enable': {
            actions: assign({
                projects: ({ context, event }) => ({
                    ...context.projects,
                    enabled: event.value
                })
            })
        },
        'project.add': {
            actions: assign({
                projects: ({ context, event }) => ({
                    ...context.projects,
                    data: [
                        ...context.projects.data,
                        { ...event.value, enabled: true }
                    ]
                })
            }),
        },
        'project.delete': {
            actions: assign({
                projects: ({ context, event }) => ({
                    ...context.projects,
                    data: context.projects.data.filter((_, i) => i != event.value)
                })
            })
        },
        'project.update': {
            actions: assign({
                projects: ({ context, event }) => ({
                    ...context.projects,
                    data: context.projects.data.map(
                        (e, i) => i != event.index ? e : { ...e, ...event.value }
                    )
                })
            })
        },
        'links.enabled': {
            actions: assign({
                links: ({ context, event }) => ({
                    ...context.links,
                    enabled: event.value
                })
            }),
        },
        'link.add': {
            actions: assign({
                links: ({ context, event }) => ({
                    ...context.links,
                    data: [
                        ...context.links.data.filter(s => s.name != event.value.name),
                        { ...event.value, enabled: true }
                    ]
                })
            }),
        },
        'link.update': {
            actions: assign({
                links: ({ context, event }) => {
                    const data = context.links.data;
                    const linkIdx = data.findIndex(s => s.name == event.id)
                    data[linkIdx] = { ...data[linkIdx], ...event.value }
                    return {
                        ...context.links,
                        data
                    }
                }
            }),
        },
        'link.delete': {
            actions: assign({
                links: ({ context, event }) => ({
                    ...context.links,
                    data: [
                        ...context.links.data.filter(s => s.name != event.id)
                    ]
                })
            }),
        },
        'skills.enabled': {
            actions: assign({
                skills: ({ context, event }) => ({
                    ...context.skills,
                    enabled: event.value
                })
            }),
        },
        'skill.add': {
            actions: assign({
                skills: ({ context, event }) => ({
                    ...context.skills,
                    data: [
                        ...context.skills.data.filter(s => s.name != event.value.name),
                        { ...event.value, enabled: true }
                    ]
                })
            }),
        },
        'skill.update': {
            actions: assign({
                skills: ({ context, event }) => {
                    const data = [...context.skills.data]
                    const toUpdateIdx = context.skills.data.findIndex(s => s.name == event.id)
                    data[toUpdateIdx] = { ...data[toUpdateIdx], ...event.value } as SkillEntry
                    return {
                        ...context.skills,
                        data
                    }
                }
            }),
        },
        'skill.delete': {
            actions: assign({
                skills: ({ context, event }) => ({
                    ...context.skills,
                    data: [
                        ...context.skills.data.filter(s => s.name != event.id)
                    ]
                })
            }),
        },
        'languages.enabled': {
            actions: assign({
                languages: ({ context, event }) => ({
                    ...context.languages,
                    enabled: event.value
                })
            }),
        },
        'language.add': {
            actions: assign({
                languages: ({ context, event }) => ({
                    ...context.languages,
                    data: [
                        ...context.languages.data.filter(l => l.name != event.value.name),
                        { ...event.value, enabled: true }
                    ]
                })
            }),
        },
        'language.update': {
            actions: assign({
                languages: ({ context, event }) => {
                    const data = [...context.languages.data]
                    const index = data.findIndex(l => l.name == event.id)
                    data[index] = { ...data[index], ...event.value }
                    return {
                        ...context.languages,
                        data
                    }
                }
            }),
        },
        'language.delete': {
            actions: assign({
                languages: ({ context, event }) => ({
                    ...context.languages,
                    data: [
                        ...context.languages.data.filter(l => l.name != event.id)
                    ]
                })
            }),
        },
        'hobbies.enabled': {
            actions: assign({
                hobbies: ({ context, event }) => ({
                    ...context.hobbies,
                    enabled: event.value
                })
            }),
        },
        'hobby.add': {
            actions: assign({
                hobbies: ({ context, event }) => ({
                    ...context.hobbies,
                    data: [
                        ...context.hobbies.data.filter(l => l.name != event.value.name),
                        { ...event.value, enabled: true }
                    ]
                })
            }),
        },
        'hobby.update': {
            actions: assign({
                hobbies: ({ context, event }) => {
                    const data = context.hobbies.data;
                    const hobbyIdx = data.findIndex(l => l.name == event.id)
                    data[hobbyIdx] = { ...data[hobbyIdx], ...event.value }
                    return {
                        ...context.hobbies,
                        data
                    }
                }
            }),
        },
        'hobby.delete': {
            actions: assign({
                hobbies: ({ context, event }) => ({
                    ...context.hobbies,
                    data: [
                        ...context.hobbies.data.filter(l => l.name != event.id)
                    ]
                })
            }),
        },
    },
    states: {
        composingResume: {
            on: {
                createTemplate: { target: 'templateDeveloping' }
            }
        },
        templateDeveloping: {
            on: {
                developingFinished: { target: 'composingResume' }
            }
        }
    }
})


export type MachineType = typeof resumeMachine
export type MachineEmitter = Actor<typeof resumeMachine>['send']

export default resumeMachine