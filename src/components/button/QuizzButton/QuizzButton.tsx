import './QuizzButton.css';

type QuizzButtonProps = {
    children: string;
    onClick?: () => void;
}
export function QuizzButton({children, onClick}: QuizzButtonProps){
    return (
        <button className="quizz-button" onClick={onClick}>{children}</button>
    );
}