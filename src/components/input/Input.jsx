/* eslint-disable react/prop-types */
import React, { useId } from "react"

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className="w-full">
            {label &&
                <label htmlFor={id} className="inline-block mb-1 pl-1">
                    {label}
                </label>
            }
            <input
                type={type}
                id={id}
                className={`${className}`}
                {...props}
                ref={ref}
            />
        </div>
    )
})

export default Input