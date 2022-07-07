import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

const ChatIndividual = (props) => {
  const { userProfile } = useContext(AuthContext);
  const { authorid, commentDate, commentText, _id } = props.info;
  // const deleteFrontend = props.deleteFrontend;
  // console.log("userprofileid", typeof userProfile.id);
  // console.log("authorid", typeof authorid._id);
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
      props.deleteFrontend(_id);
    } catch (error) {
      console.log(error);
    }
  };

  const messageDate = (date) => {
    return new Date(date).toLocaleTimeString();
  };

  const getAuthorId = (id) => {
    let authorID = "";
    if (typeof id === "string") {
      authorID = id;
    } else {
      authorID = id._id;
    }
    return authorID;
  };
  return (
    <li>
      <div classname="message">
        {getAuthorId(authorid) === userProfile.id ? (
          <p>You wrote on {messageDate(commentDate)}:</p>
        ) : (
          <p>
            {authorid.name} wrote on {messageDate(commentDate)}:
          </p>
        )}
        <p>{commentText}</p>

        {getAuthorId(authorid) === userProfile.id ? (
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
