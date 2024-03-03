import React, { useState } from "react";
import { CardInterface } from "../../interfaces/CardInterface";
import './Card.css';
import CardServices from "../../services/CardServices";

type CardProps = {
    card: CardInterface;
    onValidate?: () => void;
};

export function Card({card, onValidate}: CardProps) {
    const [isFlipped, setIsFlipped] = useState<boolean>(false);


    const handleClick = (): void => {
        setIsFlipped(!isFlipped);
    };

    const handleValidation = (): void => {
        CardServices.updateCard(card.id, {isValid: true})
            .then((response): void => {
                console.log(response.data);
                if (onValidate) {
                    onValidate();
                }
            })
            .catch((error): void => {
                console.log(error);
            });
    };

    return (
        <div>
            <div className={`card-container${isFlipped ? " card-flipped" : ""}`} onClick={handleClick}
                 data-testid="card-container">
                <div className="front">
                    <p className="card-tag">@{card.tag}</p>
                    <h1 className="card-title">{card.category}</h1>
                    <p className="card-question">Question: {card.question}</p>
                    <p className="card-date" data-testid="card-date">Dernière réponse le: {card.lastReviewed}</p>
                </div>
                <div className="back">
                    <p className="card-response">Réponse: {card.answer}</p>
                    {onValidate ? <button className="card-force-validation" onClick={handleValidation}>Forcer la validation</button> : null}
                </div>
            </div>
        </div>

    )
        ;
}