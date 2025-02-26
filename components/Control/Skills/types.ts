import { SkillEntry } from "@/machines/types";

export interface CategoryOption { value: string, label: string }
export type FilterFunction = (s:SkillEntry[]) => SkillEntry[]