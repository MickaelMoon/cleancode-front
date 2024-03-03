import React, {useEffect, useState} from "react";
import {CardInterface} from "../../interfaces/CardInterface";
import CardServices from "../../services/CardServices";
import {Card} from "../../components/card/Card";
import './Quizz.css';
import {QuizzInput} from "../../components/input/QuizzInput";
import {QuizzButton} from "../../components/button/QuizzButton/QuizzButton";
import {NavigateToButton} from "../../components/button/HomeButton/NavigateToButton";



function Quizz() {
    const [cards, setCards] = useState<CardInterface[]>([]);
    const [currentCard, setCurrentCard] = useState<number>(0);
    const [inputValue, setInputValue] = useState<string>('');
    const [showAnimation, setShowAnimation] = useState<boolean>(false);
    const [answerStatus, setAnswerStatus] = useState<string>('');


    useEffect((): void => {
        CardServices.getCardsForQuizz().then((response): void => {
            console.log(response.data);
            setCards(response.data);
        }).catch((error): void => {
            console.log(error);
        });
    }, []);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(event.target.value);
    };

    const handleAnswer = (message: string) => {
        setAnswerStatus(message);
        setShowAnimation(true);
        setTimeout(() => {
            setAnswerStatus('');
            setShowAnimation(false);
        }, 2000);
    };

    const handleValidation = (): void => {
        CardServices.updateCard(cards[currentCard].id, {isValid: true})
            .then((response): void => {
                console.log(response.data);
            })
            .catch((error): void => {
                console.log(error);
            });
        setCurrentCard(currentCard + 1);
        setInputValue('');
    };

    const nextCard = (): void => {
    if (inputValue.toLowerCase() === cards[currentCard].answer.toLowerCase()) {
        handleAnswer('Bonne réponse !');
        CardServices.updateCard(cards[currentCard].id, {isValid: true})
            .then((response): void => {
                console.log(response.data);
            })
            .catch((error): void => {
                console.log(error);
            });
        setCurrentCard(currentCard + 1);
        setInputValue('');
    } else {
        handleAnswer('Mauvaise réponse !');
    }
    };

    return (
        <div className="quizz-content">
            <div className="quizz-card">
                {currentCard < cards.length ? (
                    <React.Fragment>
                        {cards.length > 0 && <Card card={cards[currentCard]} onValidate={handleValidation}/>}
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                    <p>Le quiz est terminé, il n'y a plus de fiche !</p>
                    <NavigateToButton href="/" className="redirect-to-home">Retour à la page d'accueil</NavigateToButton>
                    </React.Fragment>
                )}
                {showAnimation && <div className="animation">{answerStatus}</div>}
            </div>
            <div className="quizz-fields">
            <QuizzInput
                    className={'quizz-input'}
                    type={'text'}
                    placeholder={'Saisissez votre réponse ici'}
                    value={inputValue}
                    onChange={handleInputChange}/>
                <QuizzButton onClick={nextCard}>Valider</QuizzButton>
            </div>
        </div>
)
    ;
}

export default Quizz;