import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

const ChatIndividual = (props) => {
  const { userProfile } = useContext(AuthContext);
  const { authorid, commentDate, commentText, _id } = props.info;
  const handleEditComment = () => {
    console.log("message is edited");
  };

  const handleDeleteComment = async () => {
    console.log("message is deleted");
    // const urlencoded = new URLSearchParams();
    // urlencoded.append("commentID", _id);
    const options = {
      method: "DELETE",
      //   body: urlencoded,
    };
    try {
      const response = await fetch(
        `http://localhost:5001/api/comment/deletecomment/${_id}`,
        options
      );
      console.log("response", response);
      const deletedDoc = await response.json();
      console.log("deletedDoc", deletedDoc);
    } catch (error) {
      console.log(error);
    }
  };

  const messageDate = (date) => {
    return new Date(date).toLocaleTimeString();
  };

  return (
    <li>
      <div classname="message">
        {authorid._id === userProfile.id ? (
          <p>You wrote on {messageDate(commentDate)}:</p>
        ) : (
          <p>
            {authorid.name} wrote on {messageDate(commentDate)}:
          </p>
        )}
        <p>{commentText}</p>

        {authorid._id === userProfile.id ? (
          <div style={{ justifySelf: "flex-end" }}>
            <IconButton aria-label="edit comment" onClick={handleEditComment}>
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete comment"
              onClick={handleDeleteComment}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ) : null}
      </div>
    </li>
  );
};

export default ChatIndividual;
