import { useState, useEffect } from 'react';

export default function RangeInput({ 
    value,
    min = 0,
    max = 10,
    float = true,
    precision = 1,
    onChange 
    }: {
        value?: number,
        min?: number,
        max?: number,
        float?: boolean,
        precision?: number,
        onChange?: (value: number) => void
}) {
    const [percentage, setPercentage] = useState(100)

    const factor = float ? 100 : 1
    const minValue = min * factor
    const maxValue = max * factor

    const calcValue = (percentage: number): number => {
        const val = (minValue + (maxValue - minValue) * percentage / 100) / factor
        return parseFloat(val.toFixed(float?precision:0))
    }

    useEffect(() => {
        const initialVal = (value ?? max) > max ? max :
                            (value ?? max) < min ? min : (value ?? max)
        const val = 100 * (initialVal - min) / (max - min);
        setPercentage(val)
    }, [])

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col">
                <div className='ml-auto text-2xl'><strong>{ calcValue(percentage) }</strong> / 10</div>
                <div className="flex flex-col relative p-1">
                    <div className='absolute top-0 left-0 w-full h-full bg-transparent outline outline-1 outline-blue-500 rounded-full p-1'>
                        <div
                            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full overflow-hidden"
                            style={{ width: `min(100%, calc(${percentage}% + ${1 - percentage/100} * 2rem))`}}
                        ></div>
                    </div>                
                    <input 
                        type='range'
                        value={percentage}
                        className='range w-full'
                        min={0}
                        max={100}
                        onChange={e => {
                            const val = parseInt(e.target.value)
                            setPercentage(val)
                            onChange?.(calcValue(val))
                        }}
                    />
                </div>
            </div>
        </div>
    )
}