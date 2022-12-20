import React from "react";

import style from "./DataSetCard.module.css";
import Thumbnail from "../Image/Thumbnail.jsx";
import Button from "../Button/Button.jsx";

const {
  dataset,
  description: descriptionClass,
  inline,
  logo,
  countryClass,
} = style;

const DatasetCard = ({
  thumbnailUrl = "",
  label,
  description,
  costPerRecord = "",
  totalAvailableRecords = 0,
  countries,
}) => {
  return (
    <div className={dataset}>
      <div className={logo}>
        <Thumbnail url={thumbnailUrl} />
        <h2>{label}</h2>
      </div>

      <div className={descriptionClass}>
        <h4>Dataset Description</h4>
        <p>{description}</p>
      </div>
      <div className={inline}>
        <h4> Cost per record</h4>
        <p>${costPerRecord}</p>
      </div>
      <div className={inline}>
        <h4>Available Records</h4>
        <p>{totalAvailableRecords}</p>
      </div>
      <div className={countryClass}>
        <h4>Included Countries</h4>
        <div>
          {countries?.map(({ countryCode, name }) => {
            return <Button key={countryCode} value={name} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default DatasetCard;
