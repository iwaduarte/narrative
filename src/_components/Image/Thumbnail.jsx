import React, { useState } from "react";

import style from "./Thumbnail.module.css";

const { image } = style;

const Thumbnail = ({ url }) => {
  const [fallback, setFallback] = useState(false);
  return fallback ? (
    <div className={image}></div>
  ) : (
    <img className={image} onError={() => setFallback(true)} src={url} alt="" />
  );
};

export default Thumbnail;
