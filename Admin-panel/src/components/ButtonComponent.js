import React from 'react';
import { Button } from 'reactstrap';

const ButtonComponent = ({
    // default values of props
    divClassName = "",
    className = "",
    label = "Click",
    size = null,
    color = "primary",
    onClick = () => { },
    children,
    ...props

}) => (

    <div className={`text-center ${divClassName}`}>
        <Button
            className={className}
            size={size}
            color={color}
            onClick={onClick}
            {...props}
        >
            {children || label}
        </Button>
    </div>
);

export default ButtonComponent;
