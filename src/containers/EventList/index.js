import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  // console.log("Selected Type:", type); //  OK
  const filteredEvents = data?.events
    .filter((event) => {
      // bout de code manquant pour les filtres
      if (!type || event.type === type) {
        return true;
      }
      return false;
    })
    .filter((event, index) => {
      // console.log("filteredEvents after filtering:", filteredEvents); OK
      // console.log("currentPage:", currentPage); // permet de controler l'état de la page OK
      // console.log("PER_PAGE:", PER_PAGE); // permet de controler le nbr d element par page OK
      // console.log("index:", index); // permet de controler le nombre d'index  OK

      if (
        (currentPage - 1) * PER_PAGE <= index &&
        PER_PAGE * currentPage > index
      ) {
        return true;
      }
      return false;
    });
  // console.log("Filtered Events Length:", filteredEvents.length);    OK

  const changeType = (evtType) => {
    // console.log("Changing type to:", evtType);     OK
    setCurrentPage(1);
    //  Utilisez setTimeout pour vérifier la valeur après un court délai  OK
    //  setTimeout(() => {
    //   console.log("currentPage after setCurrentPage:", currentPage);
    //  }, 100);  Attendez 100 ms pour laisser le temps à l'état d'être mis à jour.    OK

    setType(evtType);

    // console.log("Changing type to:", evtType);        OK
  };

  // useEffect(() => {
  //   console.log("currentPage after setCurrentPage:", currentPage);     OK
  //  }, [currentPage]);

  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  const typeList = new Set(data?.events.map((event) => event.type));
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(newValue) =>
              newValue ? changeType(newValue) : changeType(null)
            }
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}    
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
