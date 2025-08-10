import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = '', ...props }, ref) => {
        return (
            <div className="space-y-1">
                <input
                    ref={ref}
                    placeholder={label}
                    className={`
            w-full mt-2 px-3 py-2 border rounded-lg
            transition-colors duration-200 ease-in-out
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
            ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}
            ${className}
          `}
                    {...props}
                />
                {error && <p className="font-sans text-sm text-red-600">{error}</p>}
            </div>
        );
    }
);
Input.displayName = 'Input';