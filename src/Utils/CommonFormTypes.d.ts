export interface CommonFormTypes {
    loading?: boolean;
    handleChange?: () => void;
    handleBlur?: () => void;
    handleSubmit?: (e?: any) => void;
    setFieldValue?: (name: string, event: (string | undefined)[] | string) => void;
}
