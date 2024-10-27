/* eslint-disable react/prop-types */
import React, { useId } from 'react';
import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material';

function Select({
  options,
  label,
  className,
  value,
  onChange,
  ...props
}, ref) {
  const id = useId();

  return (
    <FormControl fullWidth className={className}>
      {label && <InputLabel id={`${id}-label`}>{label}</InputLabel>}
      <MuiSelect
        labelId={`${id}-label`}
        id={id}
        value={value}
        label={label}
        onChange={onChange}
        ref={ref}
        {...props}
      >
        {options?.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}

export default React.forwardRef(Select);