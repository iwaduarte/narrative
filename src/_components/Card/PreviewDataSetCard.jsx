import React from "react";

import style from "./PreviewDataSetCard.module.css";
import Thumbnail from "../Image/Thumbnail.jsx";

const {
  preview,
  description,
  isSelected: isSelectedClass,
  clickable: clickableClass,
} = style;

const PreviewDataSetCard = ({
  thumbnailUrl = "",
  label,
  costPerRecord = "",
  isSelected = false,
  onClick = () => {},
  clickable = false,
}) => {
  return (
    <div
      className={`${preview} ${isSelected ? isSelectedClass : ""} ${
        clickable ? clickableClass : ""
      }`}
      onClick={onClick}
    >
      <Thumbnail url={thumbnailUrl} />
      <div className={description}>
        <h5>{label}</h5>
        <small>{costPerRecord} per record</small>
      </div>
    </div>
  );
};

export default PreviewDataSetCard;
