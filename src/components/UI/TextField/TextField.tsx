import React from 'react';

type InputElement = HTMLInputElement | HTMLTextAreaElement;
type InputChangeEvent = React.ChangeEvent<InputElement>;

interface TextFieldProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  name?: string;
  type?: 'email' | 'password' | 'text';
  textarea?: boolean;
}

const TextField = ({ onChange, textarea = false, ...rest }: TextFieldProps) => {
  const InputElement = textarea ? 'textarea' : 'input';
  return (
    <InputElement
      onChange={({ target: { value } }: InputChangeEvent) => onChange(value)}
      {...rest}
    />
  );
};

export default TextField;