import { createMachine, assign, enqueueActions } from "xstate";

export type SocialLink = {
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
        },
        links: {
            enabled: boolean,
            data: Array<SocialLink>
        }
    },
    experience: {
        enabled: boolean,
        data: ExperienceEntry[]
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
        },
        links: {
            enabled: true,
            data: [
                {
                    icon: "https://i.pinimg.com/736x/93/fd/a4/93fda4257dbfd4412650d51641172782.jpg",
                    name: "Facebook",
                    userId: "jst.jsph",
                    url: "https://www.facebook.com/profile?user=jst.jsph",
                },
                {
                    icon: "https://i.pinimg.com/736x/93/fd/a4/93fda4257dbfd4412650d51641172782.jpg",
                    name: "Instagram",
                    userId: "jst.jsph",
                    url: "https://www.facebook.com/profile?user=jst.jsph",
                },
            ]
        }
    },
    experience: {
        enabled: true,
        data: []
    }
};

const resumeMachine = createMachine({
    id: "contact info",
    types: {
        context: {} as DataScheme,
        events: {} as { type: 'image.change', value: string }
            | { type: 'name.change', value: string }
            | { type: 'email.change', value: string }
            | { type: 'phone.change', value: string }
            | { type: 'address.change', value: string }
            | { type: 'title.change', value: string }
            | { type: 'summary.enable', value: boolean }
            | { type: 'summary.change', value: string }
            | { type: 'links.enable', value: boolean }
            | { type: 'link.add', value: SocialLink }
            | { type: 'link.delete', value: Number }
            | { type: 'experience.enable', value: boolean }
            | { type: 'experience.add', value: ExperienceEntry }
            | { type: 'experience.delete', value: number }
            | { type: 'experience.update', index: number, value: Partial<ExperienceEntry> }
        
    },
    context: initialContext,
    on: {
        'image.change': {
            actions: { type: 'assignToContext', params: {key: 'image'} }
        },
        'name.change': {
            actions: { type: 'assignToContext', params: { key: 'name' } }
        },
        'email.change': {
            actions: { type: 'assignToContext', params: {key: 'email'}}
        },
        'phone.change': {
            actions: { type: 'assignToContext', params: {key: 'phone'} }
        },
        'address.change': {
            actions: { type: 'assignToContext', params: {key: 'address'} }
        },
        'title.change': {
            actions: { type: 'assignToContext', params: {key: 'title'} }
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
        'summary.change': {
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
        'links.enable': {
            actions: assign({
                basics: ({context, event}) => ({
                    ...context.basics,
                    links: {
                        ...context.basics.links,
                        enabled: event.value
                    }
                })
            })
        },
        'link.add': {
            actions: assign({
                basics: ({context, event}) => {
                    return {
                        ...context.basics,
                        links: {
                            enabled: context.basics.links.enabled,
                            data: [...context.basics.links.data, event.value]
                        }
                    }
                }
            })
        },
        'link.delete': {
            actions: assign({
                basics: ({context, event}) => {
                    console.log(context, event)
                    return {
                        ...context.basics,
                        links: {
                            enabled: context.basics.links.enabled,
                            data: context.basics.links.data.filter((_, idx) => idx != event.value)
                        }
                    }
                }
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
        }
    }
}, {
    actions: {
        assignToContext: enqueueActions(({enqueue, context, event}, params) => {
            console.log(event)
            enqueue.assign({
                basics:  {
                    ...context.basics,
                    [(params as {key: string}).key]: event.value
                }
            })
        })
    }
})

export default resumeMachine