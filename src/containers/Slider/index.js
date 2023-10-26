import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const getSortedData = () => {
  const { data } = useData();

  if (!data || !data.focus) {
    return [];
  }

  return data.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
};

const Slider = () => {
  const [index, setIndex] = useState(0);

  const byDateDesc = getSortedData();

  const nextCard = () => {
    setTimeout(() => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0), 5000);
  };

 // ajout de la fonction  handleRadioChange pour gérer le changement de radio
 const handleRadioChange = (newIndex) => {
  setIndex(newIndex);
};

  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.id} className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3 data-testid="slide-card-title">{event.title}</h3>
              <p data-testid="slide-card-description">{event.description}</p>
              <div data-testid="slide-card-month">{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((event, radioIdx) => (
            <input
              key={event.id} // Utilisation de  l'ID de l'événement focus comme clé unique
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => handleRadioChange(radioIdx)} // Ajout  d'un gestionnaire onChange
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;


