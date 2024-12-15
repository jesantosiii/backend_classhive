import React, { FC } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  placeholder?: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number; // New optional prop
  minLength?: number; // New optional prop
}

const Input: FC<InputProps> = ({
  id,
  placeholder = "Enter text",
  className = "",
  value,
  onChange,
  type = "text",
  maxLength,
  minLength,
  ...props
}) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      minLength={minLength}
      className={`bg-transparent border-gray-600 text-white border-b border-t-0 border-x-0 rounded-none px-0 h-12 placeholder:text-gray-400 focus:border-white focus:ring-0 ${className}`}
      {...props}
    />
  );
};

export default Input;
