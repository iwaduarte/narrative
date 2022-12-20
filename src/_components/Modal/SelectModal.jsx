import React, { useRef, useState } from "react";
import style from "./SelectModal.module.css";
import Button from "../Button/Button.jsx";
import Draggable from "react-draggable";

const { modal, body, h4, grabbable } = style;

const SelectModal = ({ title, items, onClick }) => {
  const [isDisabled, setIsDisabled] = useState({});
  const nodeRef = useRef(null);

  const handleClick = (id) => {
    const newIsDisabled = { ...isDisabled, [id]: !isDisabled[id] };
    setIsDisabled(newIsDisabled);
    onClick(newIsDisabled);
  };

  return (
    <Draggable nodeRef={nodeRef}>
      <div ref={nodeRef} className={`${modal} ${grabbable}`}>
        <h4 className={h4}> {title} </h4>
        <div className={body}>
          {items?.map((item, id) => (
            <Button
              disabled={!!isDisabled[item.countryCode]}
              key={id}
              value={item.name}
              onClick={() => handleClick(item.countryCode)}
            />
          ))}
        </div>
      </div>
    </Draggable>
  );
};

export default SelectModal;
