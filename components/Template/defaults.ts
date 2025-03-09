

export const defaultJsCode = `
/**
 * The code you write here will only affect the version you have.
 * The code you write here must be valid react code.
 * 
 * If you wish to share a template send it as attachment to salmi19971@gmail.com.
 */

/**
 * 
 * The Code Have to have a function called 'Template' that take an argument
 * of type DataScheme (DataScheme is defined in the end of the file)
 */

function Template({ data }) {
    const { basics } = data
    return (
        <div className="flex gap-8 p-6">
            <img src={basics.image} className="object-cover h-24 w-24 border border-green-700 rounded-full" />
            <div className="flex flex-col justify-center">
                <h1 className="text-4xl font-bold capitalize">{basics.name}</h1>
                <h2 className="text-xl font-bold text-[#666] capitalize">{basics.title}</h2>
            </div>
            <div className="flex flex-col justify-center ml-auto">
                <h3 key="address" className="text-xl text-[#444] text-end"> {basics.address}</h3>
                <h3 key="email" className="text-xl text-[#444] text-end"> {basics.email}</h3>
                <h3 key="phone" className="text-xl text-[#444] text-end"> {basics.phone}</h3>
            </div>
        </div>
    )
}
/*
type DataScheme = {
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
        data: {
            id?: number,
            enabled?: boolean,
            position: string,
            company: string,
            location: string,
            startDate: string,
            endDate: string,
            description: string,
            bulletPoints: string[],
            technologies: {
                icon: string,
                name: string
            }[]
        }[]
    },
    education: {
        enabled: boolean,
        data: {
            id?: number,
            enabled?: boolean,
            degree: string,
            university: string,
            location: string,
            startDate: string,
            endDate: string,
            bulletPoints: string[]
        }[]
    },
    projects: {
        enabled: boolean,
        data: {
            id?: number,
            enabled?: boolean,
            name: string,
            url?: string,
            startDate: string,
            endDate: string,
            description: string,
            bulletPoints: string[],
            technologies: {
                icon: string,
                name: string
            }[]
        }[]
    },
    links: {
        enabled: boolean,
        data: {
            enabled?: boolean,
            icon: string,
            name: string,
            userId: string,
            url: string
        }[]
    },
    skills: {
        enabled: boolean,
        data: {
            enabled?: boolean,
            icon?: string,
            name: string,
            category: string,
            rating: number
        }[]
    },
    languages: {
        enabled: boolean,
        data: {
            enabled?: boolean,
            name: string,
            rating: number
        }[]
    },
    hobbies: {
        enabled: boolean,
        data: {
            enabled?: boolean,
            name: string
        }[]
    }
}
*/
`

export const defaultCssCode = `
/*
 * You can write your css styling here.
 *
 * If you use Tailwind you can use Play CDN:
 * @import url('https://unpkg.com/@tailwindcss/browser@4')
 * https://tailwindcss.com/docs/installation/play-cdn 
 * 
 */
`