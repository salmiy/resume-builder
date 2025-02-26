import { ProjectEntry, TechnologyEntry } from "@/machines/types"

export type FormState = Omit<ProjectEntry, 'bulletPoints'|'technologies'>

export type FormReducerEvent = {
    type: 'field.change',
    field: "name" | "startDate" | "endDate" | "description",
    value: string
} | { type: 'reset' }

export type ProjectExtra = {
    bulletPoints: string[],
    technologies: TechnologyEntry[]
}