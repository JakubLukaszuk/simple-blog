import * as React from "react";

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
        <button
            {...rest}
        >
            {children}
        </button>
    );
}