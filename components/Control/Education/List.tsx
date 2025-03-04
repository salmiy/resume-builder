import Switcher from "@/components/Switcher";
import { useMachineEmitter, useMachineStore } from "@/context/machineContexts";
import { DataScheme } from "@/machines/types";

import EducationCard from "./Card";

export default function EducationList(props: {
    showAddForm: () => void,
    onEditEducation: (idx: number) => void
}) {
    const { education }: DataScheme = useMachineStore()
    const emit = useMachineEmitter()

    return (
        <div className="flex-flex-col">
            <div className="flex justify-between items-center px-4">
                <h3 className="py-2 mt-2 mb-3 text-xl font-medium">Enabled</h3>
                <Switcher
                    initial={education.enabled}
                    onChange={(value: boolean) => emit?.({ type: 'education.enable', value })} />
            </div>
            {
                education.data.length == 0 ? (
                    <div className="flex flex-col items-center py-8">
                        <p className="text-3xl">No educations Yet.</p>
                        <button
                            onClick={props.showAddForm}
                            className="text-xl text-[#263f3f] font-bold underline"
                        >add education</button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3 px-3 pb-12">
                        {
                            education.data.map((e, i) => (
                                <EducationCard
                                    key={i}
                                    education={e}
                                    onEdit={() => props.onEditEducation(e.id as number)}
                                    onDelete={() => emit({ type: 'education.delete', value: i })}
                                    onEnabledChange={(enabled) => emit({ type: 'education.update', id: e.id as number ,value: { enabled: enabled } })}
                                />
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}