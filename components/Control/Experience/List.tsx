import Switcher from "@/components/Switcher";
import { useMachineEmitter, useMachineStore } from "@/context/machineContexts";
import { DataScheme } from "@/machines/types";

import ExperienceCard from "./Card";

export default function ExperienceList(props: {
    showAddForm: () => void,
    onEditExperience: (idx: number) => void
}) {
    const { experience }: DataScheme = useMachineStore()
    const emit = useMachineEmitter()

    return (
        <div className="flex-flex-col">
            <div className="flex justify-between items-center px-4">
                <h3 className="py-2 mt-2 mb-3 text-xl font-medium">Enabled</h3>
                <Switcher
                    initial={experience.enabled}
                    onChange={(value: boolean) => emit({ type: 'experience.enable', value })} />
            </div>
            {
                experience.data.length == 0 ? (
                    <div className="flex flex-col items-center py-8">
                        <p className="text-3xl">No Experiences Yet.</p>
                        <button
                            onClick={props.showAddForm}
                            className="text-xl text-[#263f3f] font-bold underline"
                        >add experience</button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3 px-3 pb-12">
                        {
                            experience.data.map((e, i) => (
                                <ExperienceCard
                                    key={i}
                                    experience={e}
                                    onEdit={() => props.onEditExperience(i)}
                                    onDelete={() => emit?.({ type: 'experience.delete', value: i })}
                                    onEnabledChange={(enabled) => console.log(enabled)}
                                />
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}