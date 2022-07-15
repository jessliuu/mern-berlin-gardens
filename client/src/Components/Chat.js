import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Card,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "../Styles/Chat.css";
import { AuthContext } from "../Contexts/AuthContext";
import ChatIndividual from "./ChatIndividual";
import { serverURL } from "../config";

const Chat = (props) => {
  const params = props.params;
  const paramsNumber = params.gardenid;
  console.log(paramsNumber);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState();

  const { userProfile, getToken } = useContext(AuthContext);
  const token = getToken();
  const options = {
    method: "GET",
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `${serverURL}/api/comment/getcomments?myGardenID=${paramsNumber}`,
        options
      );
      console.log("response", response);
      if (response.status === 200) {
        const data = await response.json();
        const cleandata = data.comments;
        console.log("comment data", cleandata);
        setComments(cleandata);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    const urlencoded = new URLSearchParams({
      authorid: userProfile.id,
      commentText: newComment,
      commentDate: new Date(),
      gardenid: paramsNumber,
    });

    const requestOptions = {
      method: "POST",
      body: urlencoded,
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await fetch(
        `${serverURL}/api/comment/postcomment`,
        requestOptions
      );
      console.log("comment response", response);
      const results = await response.json();
      console.log("comment results", results);
      // console.log("comments.length", comments.length);
      if (comments.length === 0) {
        setComments([results]);
      } else setComments([...comments, results]);
    } catch (error) {
      console.log("error posting this comment", error);
    }
    // setNewComment("");
    // fetchComments();
  };

  const deleteFrontend = (commentID) => {
    console.log(commentID);
    setComments(
      comments.filter(function (e) {
        return e._id !== commentID;
      })
    );
  };

  return (
    <div>
      <h1 className="fs-1 fw-bold text-center">Chat</h1>
      <ol className="messages">
        {comments &&
          comments.map((c) => {
            return <ChatIndividual info={c} deleteFrontend={deleteFrontend} />;
          })}
      </ol>

      <InputGroup className="p-3">
        <FormControl
          placeholder="Enter your message..."
          aria-label="Enter your message..."
          aria-describedby="basic-addon1"
          value={newComment}
          onChange={handleCommentChange}
          onKeyDown={(e) => e.key === "Enter" && handleSubmitComment()}
        />
        {/* <Button variant="danger" onClick={handleChatMessageSubmit}> */}
        <Button variant="danger" type="submit" onClick={handleSubmitComment}>
          Send
        </Button>
      </InputGroup>
    </div>
  );
};

export default Chat;
