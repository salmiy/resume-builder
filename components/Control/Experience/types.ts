import { TechnologyEntry } from "@/machines/types"


export interface FormState {
    position: string,
    company: string,
    location: string,
    startDate: string,
    endDate: string,
    description: string
}

export type FormReducerEvent = {
    type: 'field.change',
    field: "position" | "company" | "location" | "startDate" | "endDate" | "description",
    value: string
} | { type: 'reset' }

export type ExperienceExtra = {
    bulletPoints: string[],
    technologies: TechnologyEntry[]
}