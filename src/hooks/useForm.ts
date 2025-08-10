import { useState, type ChangeEvent} from "react";

export const useForm = <T extends Record<string, any>>(
    initialValues: T,
    validationRules: Record<keyof T, (value: any) => string>
) => {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
    const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

    const validateField = (name: keyof T, value: any): string => {
        if (validationRules[name]) {
            return validationRules[name](value);
        }
        return '';
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));

        if (touched[name as keyof T]) {
            const error = validateField(name as keyof T, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof T, string>> = {};
        (Object.keys(validationRules) as (keyof T)[]).forEach(field => {
            newErrors[field] = validateField(field, values[field] || '');
        });
        setErrors(newErrors);
        setTouched(
            (Object.keys(validationRules) as (keyof T)[]).reduce((acc, field) => {
                acc[field] = true;
                return acc;
            }, {} as Partial<Record<keyof T, boolean>>)
        );

        return Object.values(newErrors).every(error => !error);
    };

    return {
        values,
        errors,
        touched,
        handleChange,
        validate,
        setValues,
        setErrors,
    };
};