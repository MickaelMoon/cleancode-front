import './CardsList.css';
import {Card} from "../../components/card/Card";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {NavigateToButton} from "../../components/button/HomeButton/NavigateToButton";
import {CardCreateRequestInterface, CardInterface} from "../../interfaces/CardInterface";
import CardServices from "../../services/CardServices";

// Définir le type pour l'événement de changement d'entrée
type InputChangeEvent = ChangeEvent<HTMLInputElement>;

// Définir le type pour l'événement de soumission du formulaire
type FormSubmitEvent = FormEvent;

// Fonction pour récupérer toutes les cartes
async function fetchCards(setCards: React.Dispatch<React.SetStateAction<CardInterface[]>>) {
    try {
        const response = await CardServices.getAll();
        setCards(response.data);
    } catch (error) {
        console.error(error);
    }
}

// Fonction pour créer une nouvelle carte
async function createCard(newCard: CardCreateRequestInterface, setNewCard: React.Dispatch<React.SetStateAction<CardCreateRequestInterface>>, fetchCards: () => void) {
    try {
        const response = await CardServices.createCard(newCard);
        console.log(response.data);
        setNewCard({ question: '', answer: '', tag: '' });
        fetchCards();
    } catch (error) {
        console.error(error);
    }
}

function CardsList() {
    // Initialisation des états
    const [cards, setCards] = useState<CardInterface[]>([]);
    const [newCard, setNewCard] = useState<CardCreateRequestInterface>({ question: '', answer: '', tag: '' });

    // Utilisation de useEffect pour récupérer les cartes au chargement du composant
    useEffect((): void => {
        fetchCards(setCards).then(r => r);
    }, []);

    // Gestion du changement des inputs
    const handleInputChange = (event: InputChangeEvent): void => {
        setNewCard({...newCard, [event.target.name]: event.target.value});
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = (event: FormSubmitEvent): void => {
        event.preventDefault();
        createCard(newCard, setNewCard, () => fetchCards(setCards)).then(r => r);
    };

    return (
        <div className="cards-list-content">
            <div className="cards-list-fields">
                <form onSubmit={handleSubmit}>
                    <input data-testid="question-input" type="text" name="question" placeholder="Question" value={newCard.question}
                           onChange={handleInputChange}/>
                    <input data-testid="answer-input" type="text" name="answer" placeholder="Answer" value={newCard.answer}
                           onChange={handleInputChange}/>
                    <input data-testid="tag-input" type="text" name="tag" placeholder="Tag" value={newCard.tag} onChange={handleInputChange}/>
                    <button type="submit">Create</button>
                </form>
            </div>
            <div className="cards-list">
                {cards.length > 0 ? (
                    <div className="cards">
                        {cards.map((card: CardInterface, index: number) => <Card key={index} card={card}/>)}
                    </div>
                ) : (
                    <div className="no-cards-found">
                        <p>Il n'y a pas de fiche !</p>
                        <NavigateToButton href="/" className="redirect-to-home">Retour à la page
                            d'accueil</NavigateToButton>
                    </div>
                )}
            </div>

        </div>
    );

}

export default CardsList;