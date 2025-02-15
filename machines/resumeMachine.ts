import { createMachine, assign } from "xstate";

export type SocialLinkEntry = {
    enabled?: boolean,
    icon: string,
    name: string,
    userId: string,
    url: string
}
export type TechnologyEntry = {
    icon: string,
    name: string
}
export type ExperienceEntry = {
    enabled?: boolean,
    position: string,
    company: string,
    location: string,
    startDate: string,
    endDate: string,
    description: string,
    bulletPoints: string[],
    technologies: TechnologyEntry[]
}
export type EducationEntry = {
    enabled?: boolean,
    degree: string,
    university: string,
    location: string,
    startDate: string,
    endDate: string,
    bulletPoints: string[]
}
export type SkillEntry = {
    enabled?: boolean,
    name: string,
    category: string,
    rating: number
}
export type LanguageEntry = {
    enabled?: boolean,
    name: string,
    rating: number
}
export type HobbyEntry = {
    enabled?: boolean,
    name: string
}

export type DataScheme = {
    basics: {
        image: string,
        name: string,
        email: string,
        phone: string,
        address: string,
        title: string,
        summary: {
            enabled: boolean,
            data: string,
        }
    },
    experience: {
        enabled: boolean,
        data: ExperienceEntry[]
    },
    education: {
        enabled: boolean,
        data: EducationEntry[]
    },
    links: {
        enabled: boolean,
        data: SocialLinkEntry[]
    },
    skills: {
        enabled: boolean,
        data: SkillEntry[]
    },
    languages: {
        enabled: boolean,
        data: LanguageEntry[]
    },
    hobbies: {
        enabled: boolean,
        data: HobbyEntry[]
    }
}

const initialContext: DataScheme = {
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
    id: "contact info",
    types: {
        context: {} as DataScheme,
        events: {} as { type: 'basics.update', value: string, field: string}
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
            | { type: 'links.enabled', value: boolean }
            | { type: 'link.add', value: SocialLinkEntry }
            | { type: 'link.update', id: string, value: SocialLinkEntry }
            | { type: 'link.delete', id: string }
            | { type: 'hobbies.enabled', value: boolean }
            | { type: 'hobby.add', value: HobbyEntry }
            | { type: 'hobby.update', id: string, value: HobbyEntry }
            | { type: 'hobby.delete', id: string }
            | { type: 'skills.enabled', value: boolean }
            | { type: 'skill.add', value: SkillEntry }
            | { type: 'skill.update', id: string, value: SkillEntry }
            | { type: 'skill.delete', id: string }
            | { type: 'languages.enabled', value: boolean }
            | { type: 'language.add', value: LanguageEntry }
            | { type: 'language.update', id: string, value: LanguageEntry }
            | { type: 'language.delete', id: string }
        
    },
    context: initialContext,
    on: {
        'basics.update': {
            actions: assign({
                basics:  ({context, event}) => ({
                    ...context.basics,
                    [event.field]: event.value
                })
            })
        },
        'summary.enable': {
            actions: assign({
                basics: ({context, event}) => ({
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
                basics: ({context, event}) => ({
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
                experience: ({context, event}) => ({
                    ...context.experience,
                    enabled: event.value
                })
            })
        },
        'experience.add': {
            actions: assign({
                experience: ({context, event}) => ({
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
                experience: ({context, event}) => ({
                    ...context.experience,
                    data: context.experience.data.filter((_, i) => i != event.value)
                })
            })
        },
        'experience.update': {
            actions: assign({
                experience: ({context, event}) => ({
                    ...context.experience,
                    data: context.experience.data.map(
                        (e, i) => i != event.index ? e : { ...e, ...event.value }
                    )
                })
            })
        },
        'education.enable': {
            actions: assign({
                education: ({context, event}) => ({
                    ...context.education,
                    enabled: event.value
                })
            })
        },
        'education.add': {
            actions: assign({
                education: ({context, event}) => ({
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
                education: ({context, event}) => ({
                    ...context.education,
                    data: context.education.data.filter((_, i) => i != event.value)
                })
            })
        },
        'education.update': {
            actions: assign({
                education: ({context, event}) => ({
                    ...context.education,
                    data: context.education.data.map(
                        (e, i) => i != event.index ? e : { ...e, ...event.value }
                    )
                })
            })
        },
        'links.enabled': {
            actions: assign({
                links: ({context, event}) => ({
                    ...context.links,
                    enabled: event.value
                })
            }),
        },
        'link.add': {
            actions: assign({
                links: ({context, event}) => ({
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
                links: ({context, event}) => ({
                    ...context.links,
                    data: [
                        ...context.links.data.filter(s => s.name != event.id),
                        { 
                            ...context.links.data.find(s => s.name == event.id),
                            ...event.value
                        }
                    ]
                })
            }),
        },
        'link.delete': {
            actions: assign({
                links: ({context, event}) => ({
                    ...context.links,
                    data: [
                        ...context.links.data.filter(s => s.name != event.id)
                    ]
                })
            }),
        },
        'skills.enabled': {
            actions: assign({
                skills: ({context, event}) => ({
                    ...context.skills,
                    enabled: event.value
                })
            }),
        },
        'skill.add': {
            actions: assign({
                skills: ({context, event}) => ({
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
                skills: ({context, event}) => ({
                    ...context.skills,
                    data: [
                        ...context.skills.data.filter(s => s.name != event.id),
                        { 
                            ...context.skills.data.find(s => s.name == event.id),
                            ...event.value
                        }
                    ]
                })
            }),
        },
        'skill.delete': {
            actions: assign({
                skills: ({context, event}) => ({
                    ...context.skills,
                    data: [
                        ...context.skills.data.filter(s => s.name != event.id)
                    ]
                })
            }),
        },
        'languages.enabled': {
            actions: assign({
                languages: ({context, event}) => ({
                    ...context.languages,
                    enabled: event.value
                })
            }),
        },
        'language.add': {
            actions: assign({
                languages: ({context, event}) => ({
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
                languages: ({context, event}) => ({
                    ...context.languages,
                    data: [
                        ...context.languages.data.filter(l => l.name != event.id),
                        { 
                            ...context.languages.data.find(l => l.name == event.id),
                            ...event.value
                        }
                    ]
                })
            }),
        },
        'language.delete': {
            actions: assign({
                languages: ({context, event}) => ({
                    ...context.languages,
                    data: [
                        ...context.languages.data.filter(l => l.name != event.id)
                    ]
                })
            }),
        },
        'hobbies.enabled': {
            actions: assign({
                hobbies: ({context, event}) => ({
                    ...context.hobbies,
                    enabled: event.value
                })
            }),
        },
        'hobby.add': {
            actions: assign({
                hobbies: ({context, event}) => ({
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
                hobbies: ({context, event}) => ({
                    ...context.hobbies,
                    data: [
                        ...context.hobbies.data.filter(l => l.name != event.id),
                        { 
                            ...context.hobbies.data.find(l => l.name == event.id),
                            ...event.value
                        }
                    ]
                })
            }),
        },
        'hobby.delete': {
            actions: assign({
                hobbies: ({context, event}) => ({
                    ...context.hobbies,
                    data: [
                        ...context.hobbies.data.filter(l => l.name != event.id)
                    ]
                })
            }),
        },
    }
})

export default resumeMachine