import React from "react";
import "../Styles/Modal.css";
import { Link } from "react-router-dom";

const Modal = (props) => {
  const farmName = props.farmName;
  const gardenid = props.gardenid;
  const setShowModal = props.setShowModal;

  return (
    <div onClick={() => setShowModal(false)} className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <h4>You can share this farm by copying the link below</h4>
        <div
          className="modalPart1"
          style={{ alignSelf: "center", marginBottom: "4px" }}
        >
          <Link to={`/browse/${gardenid}`} className="p-2">
            {farmName}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
