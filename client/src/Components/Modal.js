import React from "react";

const Modal = (props) => {
  const farmName = props.farmName;
  const gardenid = props.gardenid;
  const setShowModal = props.setShowModal;

  return (
    <div onClick={() => setShowModal(false)}>
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <h4>{farmName}</h4>
        <div
          className="modalPart1"
          style={{ alignSelf: "center", marginBottom: "4px" }}
        >
          gardenid: {gardenid}
        </div>
      </div>
    </div>
  );
};

export default Modal;
