import { createMachine, assign } from "xstate";

const contactInfoMachine = createMachine({
    id: "contact info",
    context: {
        enabled: true,
        data: {
            image: "https://eteflonline.com/wp-content/plugins/ld-dashboard/public/img/img_avatar.png",
            name: "john doe",
            email: "johndoe@contact.me",
            phone: "+212 6 12 34 56 78",
            address: "Hay Mohammadi, Casablanca, Morocco",
            links: [
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
    on: {
        'contact-info.enabled': {
            actions: assign({
                enabled: ({context, event}) => event.value
            })
        },
        'image.change': {
            actions: assign({
                data: ({context, event}) => {
                    console.log(context, event)
                    return {
                        ...context.data,
                        image: event.value
                    }
                }
            })
        },
        'name.change': {
            actions: assign({
                data: ({context, event}) => {
                    return {
                        ...context.data,
                        name: event.value
                    }
                }
            })
        },
        'email.change': {
            actions: assign({
                data: ({context, event}) => {
                    return {
                        ...context.data,
                        email: event.value
                    }
                }
            })
        },
        'phone.change': {
            actions: assign({
                data: ({context, event}) => {
                    return {
                        ...context.data,
                        phone: event.value
                    }
                }
            })
        },
        
        'link.add': {
            actions: assign({
                data: ({context, event}) => {
                    console.log('link add', context, event)
                    return {
                        ...context.data,
                        links: [...context.data.links, event.value]
                    }
                }
            })
        },
        'link.delete': {
            actions: assign({
                data: ({context, event}) => {
                    console.log(context, event)
                    return {
                        ...context.data,
                        links: context.data.links.filter((_, idx) => idx != event.index)
                    }
                }
            })
        }
    }
})

export default contactInfoMachine