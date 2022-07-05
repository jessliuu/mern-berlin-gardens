import React, { useState, useEffect, useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";
import { GardensContext } from "../Contexts/GardensContext";
import {
  Container,
  Card,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "../Styles/Chat.css";
import { AuthContext } from "../Contexts/AuthContext";

const Chat = (props) => {
  const params = props.params;
  const paramsNumber = params.gardenid;
  console.log(paramsNumber);
  const [comments, setComments] = useState([]);

  const { userProfile } = useContext(AuthContext);
  const options = {
    method: "GET",
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/comment/getcomments?myGardenID=${paramsNumber}`,
        options
      );
      console.log("response", response);
      const data = await response.json();
      const cleandata = data.comments;
      console.log("comment data", cleandata);
      setComments(
        cleandata

        // author: cleandata.authorid.name,
        // commentText: cleandata.commentText,
        // commentDate: cleandata.commentDate,
        // garden: cleandata.gardenid._id,
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const messageDate = (date) => {
    return new Date(date).toLocaleTimeString();
  };

  return (
    <div>
      <h1 className="fs-1 fw-bold pt-5 text-center">Chat</h1>
      <p className="text-center">Write a message</p>
      {/* <ol className="messages">
          <ChatList />
        </ol> */}
      <ol className="messages">
        {comments &&
          comments.map((c) => {
            return (
              <li>
                <div classname="message">
                  {c.authorid._id === userProfile.id ? (
                    <p>You wrote on {messageDate(c.commentDate)}:</p>
                  ) : (
                    <p>
                      {c.authorid.name} wrote on {messageDate(c.commentDate)}:
                    </p>
                  )}
                  <p>{c.commentText}</p>
                  {c.authorid._id === userProfile.id ? (
                    <div style={{ justifySelf: "flex-end" }}>
                      <EditIcon />
                      <DeleteIcon />
                    </div>
                  ) : null}
                </div>
              </li>
            );
          })}
      </ol>

      <InputGroup className="p-3">
        <FormControl
          placeholder="Enter your message..."
          aria-label="Enter your message..."
          aria-describedby="basic-addon1"
          // value={chatMsg}
          // onChange={handleMessageChange}
          // onKeyDown={(e) => e.key === "Enter" && handleChatMessageSubmit()}
        />
        {/* <Button variant="danger" onClick={handleChatMessageSubmit}> */}
        <Button variant="danger">Send</Button>
      </InputGroup>
    </div>
  );
};

export default Chat;
