
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

export type ProjectEntry = {
    enabled?: boolean,
    name: string,
    startDate: string,
    endDate: string,
    description: string,
    bulletPoints: string[],
    technologies: TechnologyEntry[]
}

export type SkillEntry = {
    enabled?: boolean,
    icon?: string,
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
    projects: {
        enabled: boolean,
        data: ProjectEntry[]
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