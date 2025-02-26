
export interface FormState {
    degree: string,
    university: string,
    location: string,
    startDate: string,
    endDate: string
}
export type FormReducerEvent = {
    type: 'field.change',
    field: "degree" | "university" | "location" | "startDate" | "endDate",
    value: string
} | { type: 'reset' }

export type EducationExtra = {
    bulletPoints: string[]
}