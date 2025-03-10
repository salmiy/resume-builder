
import { useState, useEffect, ChangeEvent, useRef } from 'react';
import TextInput from './Input';
import Image from 'next/image';

// function throttle(fn: CallableFunction, t: number) {
//     let to: NodeJS.Timeout|null = null;
    
//     return function(...args) {
//         if (to) clearTimeout(to)
//         to = setTimeout(() => fn(args), t)
//     }
// }

const ImageInput = (props: {
    value: string,
    className?: string,
    optionsClassName?: string
    onChange: (url: string) => void,
}) => {
    const [options, setOptions] = useState(false)
    const [url, setUrl] = useState('')
    const [image, setImage] = useState(props.value)
    const prevImage = useRef<string | null>(null)

    useEffect(() => {
        if (props.value)
            setUrl(props.value)
    }, [props.value])

    const imgTmpSetFromUrl = (url: string) => {
        if (!url) return
        if (!prevImage.current) prevImage.current = image
        setImage(url)
    }

    function onPictureChange(e: ChangeEvent<HTMLInputElement>) {
        const input = e.target as HTMLInputElement
        if (!input.files) return

        const file = input.files[0]
        const url = URL.createObjectURL(file);

        // save prev value before first change
        if (!prevImage.current) prevImage.current = image

        setUrl(url);
        setImage(url)
    }
    function onInputChange(e: ChangeEvent<HTMLInputElement>) {
        setUrl(e.target.value)
        imgTmpSetFromUrl(e.target.value)
    }
    function onSave() {
        setOptions(false)
        if (!url) return
        
        prevImage.current = null
        setImage(url)
        props.onChange(url)
    }
    function onCancel() {
        setOptions(false)
        if (prevImage.current && prevImage.current != image) {
            setImage(prevImage.current)
            prevImage.current = null
        }
    }

    return (
        <div className="relative flex flex-col">
            <div
                onClick={() => setOptions(!options)}
                className={`relative flex justify-center cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] hover:scale-105 ${props.className}`}
            >
                <Image className={`object-cover`} src={image} alt="input image preview" fill />
            </div>
            {options &&
                <div className={`flex flex-col absolute w-56 bg-white text-whitef text-base shadow-xl rounded-xl overflow-hidden border border-gray-300 ${props.optionsClassName}`}>
                    <div className='flex flex-col'>
                        <div className='text-sm hidden'>url</div>
                        <TextInput
                            placeholder='url'
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="flex gap-2 pl-2 items-center">
                        <div>or</div>
                        <label className='flex-grow flex gap-3 py-3 px-2 stroke-black cursor-pointer transition-all duration-200 hover:text-[#293f3f] hover:stroke-[#293f3f] hover:font-medium'>
                            <svg className='w-6 h-6' viewBox="0 0 24 24" fill="none" >
                                <path d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 16V3M12 3L16 7.375M12 3L8 7.375" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>upload image</span>
                            <input className="hidden" type="file" accept="image/*" onChange={onPictureChange} />
                        </label>
                    </div>
                    <div className="flex">
                        <button
                            onClick={onSave}
                            className='flex-grow py-2 text-base border-t border-solid border-0 border-gray-300 font-medium text-[#263f3f]'
                        >save</button>
                        <div className='w-[1px] bg-gray-300'></div>
                        <button
                            onClick={onCancel}
                            className='flex-grow py-2 text-base border-t border-solid border-0 border-gray-300 font-medium text-[#7d1414]'>cancel</button>
                    </div>
                </div>
            }
        </div>
    )
}


export default ImageInput
