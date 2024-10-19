/* eslint-disable react/prop-types */
import React, { useId } from "react";
import TextField from '@mui/material/TextField';

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    variant = "outlined",
    margin = "normal",
    fullWidth = true,
    ...props
}, ref) {
    const id = useId();

    return (
        <div className={`w-full ${className}`}>
            <TextField
                type={type}
                id={id}
                label={label}
                variant={variant}
                margin={margin}
                fullWidth={fullWidth}
                inputRef={ref}
                {...props}
            />
        </div>
    );
});

export default Input;
