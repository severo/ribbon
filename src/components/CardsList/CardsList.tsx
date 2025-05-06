import styles from "./CardsList.module.css";
import React from "react";

interface CardsListProps {
  children?: React.ReactNode;
}

function CardsList({ children }: CardsListProps) {
  return <div className={styles.cardsList}>{children}</div>;
}

export default CardsList;
