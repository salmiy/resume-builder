import { useState } from "react"

const sizes = {
    xs: {
        block: "h-6 w-10",
        dot: "left-1 top-1 h-4 w-4"
    },
    sm: {
        block: "h-7 w-12",
        dot: "left-1 top-1 h-5 w-5"
    },
    base: {
        block: "h-8 w-14",
        dot: "left-1 top-1 h-6 w-6"
    }
}

const Switcher = ({
    onChange, initial = false, size = 'base'
}: {
    onChange: (isChecked: boolean) => void,
    initial?: boolean,
    size?: 'xs' | 'sm' | 'base'
}) => {
    const [isChecked, setIsChecked] = useState(!!initial)

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
        onChange(!isChecked)
    }

    return (
        <label className='flex cursor-pointer select-none items-center'>
            <div className='relative'>
                <input
                    type='checkbox'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className='peer sr-only'
                />
                <div className={`block ${ sizes[size].block  } rounded-full`} ></div>
                <div className={`dot absolute ${ sizes[size].dot } rounded-full bg-white transition`} ></div>
            </div>
        </label>
    )
}

export default Switcher