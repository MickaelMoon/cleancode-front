import './Home.css';
import {NavigateToButton} from "../../components/button/HomeButton/NavigateToButton";
import {useEffect, useState} from "react";
import CardServices from "../../services/CardServices";




function Home() {
    const [isCardsEmpty, setIsCardsEmpty] = useState<boolean>(false);

    useEffect((): void => {
        CardServices.getCardsForQuizz().then((response): void => {
            console.log(response.data);
            if (response.data.length === 0) {
                setIsCardsEmpty(true);
            } else {
                setIsCardsEmpty(false);
            }
        }).catch((error): void => {
            console.log(error);
        });
    }, []);

    return (
        <div className="home-content">
            <div className="home-decription">
                <h1>Bienvenue sur l'application de révision de fiches</h1>
                <p>Vous pouvez commencer à réviser vos fiches en cliquant sur le bouton ci-dessous</p>
            </div>
            <div className="home-buttons">
                    {isCardsEmpty ? (
                        <p className="redirect-to-disable">Quiz non disponible</p>
                    ) : (
                        <NavigateToButton href="/quizz" className="redirect-to-quizz">Commencer le
                            quiz</NavigateToButton>
                    )}
                <NavigateToButton href="/cards" className="redirect-to-cards">Consulter les fiches</NavigateToButton>
            </div>
            <div className="footer">
                <div className="copyright">
                    <p>© 2024 REVDF. Tous droits réservés.</p>
                </div>
            </div>
        </div>
    );

}

export default Home;