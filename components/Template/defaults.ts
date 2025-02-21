

export const defaultJsCode = `
/**
 * MUST INCLUDE a Template function
 */

function Template({ data }) {
    const { basics } = data
    return (
        <div className="flex gap-8 p-6">
            <img src={basics.image} className="object-cover h-24 w-24 border border-green-700 rounded-full" />
            <div className="flex flex-col justify-center">
                <h1 className="text-4xl font-bold capitalize">{basics.name}</h1>
                <h2 className="text-xl font-bold text-[#666] capitalize">{basics.title}</h2>
            </div>
            <div className="flex flex-col justify-center ml-auto">
                <h3 key="address" className="text-xl text-[#444] text-end"> {basics.address}</h3>
                <h3 key="email" className="text-xl text-[#444] text-end"> {basics.email}</h3>
                <h3 key="phone" className="text-xl text-[#444] text-end"> {basics.phone}</h3>
            </div>
        </div>
    )
}`

export const defaultCssCode = `
/*
 * 
 * you can only include @font-face @import
 * 
**/
`