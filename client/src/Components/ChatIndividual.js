import React, { useContext, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import "../Styles/Chat.css";
import AlertConfirm from "./AlertConfirm";
import { serverURL } from "../config";

const ChatIndividual = (props) => {
  const { userProfile, loginStatus } = useContext(AuthContext);
  const { authorid, commentDate, commentText, _id } = props.info;
  const [showAlertConfirm, setShowAlertConfirm] = useState(false);
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
        `${serverURL}/api/comment/deletecomment/${_id}`,
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

  const messageDate = (time) => {
    let date = new Date(time);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
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
    <li
      className={
        authorid && getAuthorId(authorid) === userProfile.id ? "mine" : ""
      }
      // key={getAuthorId(authorid)}
    >
      <div classname="message">
        <div className="text">
          {authorid && getAuthorId(authorid) === userProfile.id ? (
            <p className="author-me bold">
              You wrote on {messageDate(commentDate)}:
            </p>
          ) : (
            <p className="author-other bold">
              {authorid.name} wrote on {messageDate(commentDate)}:
            </p>
          )}
          <p
            className={
              authorid && getAuthorId(authorid) === userProfile.id
                ? "author-me"
                : "author-other"
            }
          >
            {commentText}
          </p>
          {authorid && getAuthorId(authorid) === userProfile.id ? (
            <div>
              <IconButton
                style={{ padding: "0" }}
                aria-label="edit comment"
                onClick={handleEditComment}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                style={{ padding: "0" }}
                aria-label="delete comment"
                onClick={() => setShowAlertConfirm(true)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          ) : null}

          {showAlertConfirm && (
            <AlertConfirm
              setShowAlertConfirm={setShowAlertConfirm}
              message="Are you sure you want to delete this message?"
              button1="Yes, delete this message"
              button2="No, keep this message"
              handleDelete={handleDeleteComment}
              id={_id}
            />
          )}
        </div>
      </div>
    </li>
  );
};

export default ChatIndividual;
