import { useMachineEmitter, useMachineStore } from "@/context/machineContexts";
import { DataScheme } from "@/machines/types";
import Switcher from "@/components/Switcher";

import ProjectCard from "./Card";

export default function ProjectList(props: {
    showAddForm: () => void,
    onEditproject: (idx: number) => void
}) {
    const { projects }: DataScheme = useMachineStore()
    const emit = useMachineEmitter()

    return (
        <div className="flex-flex-col">
            <div className="flex justify-between items-center px-4">
                <h3 className="py-2 mt-2 mb-3 text-xl font-medium">Enabled</h3>
                <Switcher
                    initial={projects.enabled}
                    onChange={(value: boolean) => emit?.({ type: 'projects.enable', value })} />
            </div>
            {
                projects.data.length == 0 ? (
                    <div className="flex flex-col items-center py-8">
                        <p className="text-3xl">No projects Yet.</p>
                        <button
                            onClick={props.showAddForm}
                            className="text-xl text-[#263f3f] font-bold underline"
                        >add project</button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3 px-3 pb-12">
                        {
                            projects.data.map((e, i) => (
                                <ProjectCard
                                    key={i}
                                    project={e}
                                    onEdit={() => props.onEditproject(i)}
                                    onDelete={() => emit?.({ type: 'project.delete', value: i })}
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