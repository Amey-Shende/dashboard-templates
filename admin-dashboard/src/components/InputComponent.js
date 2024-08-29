import React from 'react';
import { Input, Label } from 'reactstrap';

const InputComponent = ({
    // default values of props
    divClassName = "",
    label = "",
    name="",
    type = "text",
    placeholder,
    id="",
    className = "",
    value="",
    onChange=()=>{},
    ...props  

    }) => (

    <div className={divClassName}>
        {label && <Label for={name} className='user-select-none'>{label}</Label>}

        <Input
            type={type}
            placeholder={placeholder}
            name={name}
            id={id}
            className={`${type !== "checkbox" ? "form-control" : ""} remove-focus-ring ${className}`}
            // className={`form-control remove-focus-ring ${className}`}
            value={value}
            onChange={onChange}
            {...props}
        />

    </div>
);

export default InputComponent;


