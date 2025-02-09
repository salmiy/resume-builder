import { ChangeEventHandler } from "react"


export default function TextInput({
        className, name, placeholder, value, onChange
    }: {
        className?: string,
        name?: string,
        placeholder: string,
        value?: string,
        onChange: ChangeEventHandler<HTMLInputElement>
}) {
    return (
        <input 
            className={`px-4 py-2 border-solid border-b border-[#ccc] text-lg text-[#222] outline-none bg-transparent ${className}`}
            type="text" 
            name={name}
            placeholder={placeholder}
            value={value} 
            onChange={onChange} />
    )
}