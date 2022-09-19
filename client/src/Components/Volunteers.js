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
  };
  return (
    <div>
      {volunteers.length > 0 ? (
        <p>
          {volunteers.length} volunteer(s)
          <span
            style={{
              // fontSize: "small",
              color: "blue",
            }}
            onClick={() => handleEmail()}
          >
            {showEmail ? (
              <span>&#32;View &#8963;</span>
            ) : (
              <span>&#32;&#32;&#32;View &#8964;</span>
            )}
          </span>
        </p>
      ) : null}

      {showEmail &&
        volunteers.map((v) => (
          <ol>
            <li>
              <p onClick={() => (window.location = `mailto:${v.email}`)}>
                <IconButton
                  aria-label="send email"
                  onClick={() => (window.location = `mailto:${v.email}`)}
                >
                  <MailOutlineIcon />
                </IconButton>
                {v.name}
              </p>
            </li>
          </ol>
        ))}
    </div>
  );
};

export default Volunteers;
