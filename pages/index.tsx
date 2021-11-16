import { useEffect, useState } from "react";

import { AddOrEditCard, Button, ButtonVariants, Modal } from "components";
import { cardService } from "services";
import { CreditCard } from "components/CreditCard/CreditCard";
import styles from "styles/pages/Home.module.scss";

export default Index;

export enum TitlesEnum {
  Add = "Add your card details",
  Edit = "Edit your card"
}

function Index(): JSX.Element {
  const [cards, setCards] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(undefined);

  const getAllCards = () => {
    cardService.getAll().then((x) => setCards(x));
  };

  useEffect(getAllCards, []);

  const toggleModal = () => {
    setModal(!modal);

    if (modal) {
      setSelectedCard(undefined);
    }
  };

  const updateAvailableCards = () => {
    toggleModal();
    getAllCards();
  };

  const callbackHandler = (data: number) => {
    const card = cards.find((card) => card.id === data);
    setSelectedCard(card);
    toggleModal();
  };

  return (
    <>
      <div className="wrapper">
        <div className="row">
          <div className={styles.homeHeader + " col"}>
            <h1 className={styles.homeHeaderTitle}>Your cards</h1>
            <h4 className={styles.homeHeaderSubtitle}>
              Add, edit or delete your cards any time
            </h4>
          </div>
          {cards &&
            cards.map((card) => (
              <div key={card.id} className={"col " + styles.homeCardContainer}>
                <CreditCard
                  data={card}
                  isEditEnabled={true}
                  creditCardEditHandler={callbackHandler}
                />
              </div>
            ))}
          {!cards?.length && <div className="col">No Cards to display</div>}
          <div className={styles.homeCta}>
            <Button
              variant={ButtonVariants.primary}
              label={"Add new card"}
              handleClick={toggleModal}
            />
          </div>
        </div>
      </div>
      <Modal
        show={modal}
        close={toggleModal}
        title={selectedCard ? TitlesEnum.Edit : TitlesEnum.Add}
      >
        <AddOrEditCard
          cardToEdit={selectedCard}
          parentHandler={updateAvailableCards}
        />
      </Modal>
    </>
  );
}
