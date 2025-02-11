import useAutosizeTextArea from "@/hooks/useAutoResizeArea";
import { ChangeEventHandler, useEffect, useRef, useState } from "react"


export function AutoResizeTextArea({
    value = "",
    className = "",
    placeholder,
    onChange
}: {
    className?: string,
    placeholder?: string,
    onChange?: ChangeEventHandler<HTMLTextAreaElement>,
    value?: string,
})
{
    const taRef = useRef<HTMLTextAreaElement>(null);
    // useEffect(() => taRef.current?.setAttribute('rows', '1'))
    useAutosizeTextArea(taRef.current, value)

    return (
        <textarea
            className={`resize-none py-2 px-4 border-0 border-b border-solid border-[#ccc] text-lg text-[#333] outline-none bg-transparent overflow-hidden ${className}`}
            placeholder={placeholder}
            rows={1}
            ref={taRef}
            value={value}
            onChange={onChange}>
        </textarea>
    )
}
