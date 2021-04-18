import * as React from "react";
import './BaseButton.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * Button.
 *
 * @param {ButtonProps} props button's props
 * @returns {React.ReactElement<ButtonProps>} Button.
 */
export const BaseButton = (props: ButtonProps): React.ReactElement<ButtonProps> =>{
    const { children, ...rest } = props;
    return (
        <button className="BaseButton"
            {...rest}
        >
            {children}
        </button>
    );
}