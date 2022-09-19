import React, { useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { IconButton } from "@mui/material";

const Volunteers = (props) => {
  const volunteers = props.volunteers;
  const [showEmail, setShowEmail] = useState(false);
  const handleEmail = () => {
    if (!showEmail) {
      setShowEmail(true);
    } else setShowEmail(false);
    console.log(showEmail);
  };
  return (
    <div>
      {volunteers.length > 0 ? (
        <p>
          <IconButton
            aria-label="view volunteers"
            onClick={() => handleEmail()}
          >
            <MailOutlineIcon />
          </IconButton>{" "}
          {volunteers.length} volunteer(s)
        </p>
      ) : null}

      {showEmail &&
        volunteers.map((v) => (
          <div>
            <p>{v.name}</p>
            <p>{v.email}</p>
          </div>
        ))}
    </div>
  );
};

export default Volunteers;
