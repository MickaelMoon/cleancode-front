import './QuizzInput.css';

type TextInputProps = {
    className?: string;
    value: string;
    placeholder?: string;
    type?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export function QuizzInput({className, value, placeholder, type, onChange}: TextInputProps){
    return (
        <input className={className} type={type} placeholder={placeholder} value={value} onChange={onChange}/>
    );
}