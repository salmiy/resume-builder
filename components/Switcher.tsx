import { useState } from "react"

const Switcher = (props: {
    onChange: CallableFunction,
    initial?: Boolean
}) => {
    const [isChecked, setIsChecked] = useState(!!props?.initial)

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
        props?.onChange(!isChecked)
    }

    return (
        <label className='row pointer select-none align-center'>
            <div className='relative'>
                <input
                    type='checkbox'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className='peer sr-only'
                />
                <div className='block h-8 w-14 rounded-full' ></div>
                <div className='dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition' ></div>
            </div>
        </label>
    )
}

export default Switcher