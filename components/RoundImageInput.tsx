
import { useState, useEffect, ChangeEvent } from 'react';

const RoundImageInput = (props: { 
    value: string,
    className: string,
    imgClassName: string
    onChange: CallableFunction,
}) => {
    const [image, setImage] = useState(props.value)

    useEffect(() => {
        props.onChange(image)
    }, [])

    function onPictureChange(e: ChangeEvent<HTMLInputElement>) {
        const input = e.target as HTMLInputElement
        if (!input.files) return

        const file = input.files[0]
        const url = URL.createObjectURL(file);

        setImage(url);
        props.onChange(url)
    }

    return (
        <label className={`round-img-input ${props.className}`}>
            <input type="file" accept="image/*" onChange={onPictureChange} className="hidden" />
            <img className={props.imgClassName} src={image} />
        </label>
    )
}


export default RoundImageInput
