import React from "react";
import { format, parseISO } from "date-fns";
import style from "./OrderItemCard.module.css";

const { card: orderItemCard } = style;

const Card = ({ field, onClick }) => {
  const { name, createdAt = "", budget } = field || {};

  const formattedDate = createdAt && format(parseISO(createdAt), "MM/dd/yyyy");

  return (
    <div className={orderItemCard} onClick={onClick}>
      <div>
        <h4>Order name</h4>
        <h3>{name}</h3>
      </div>
      <div>
        <h4>Date Created</h4>
        <h3>{formattedDate}</h3>
      </div>
      <div>
        <h4>Budget</h4>
        <h3>${budget}</h3>
      </div>
    </div>
  );
};

export default Card;
