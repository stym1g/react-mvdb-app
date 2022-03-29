import React, { useState } from "react";
import { Button, Input, Typography } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";

const { TextArea } = Input;
const { Title } = Typography;
function Comments(props) {
  const user = useSelector((state) => state.user);
  //console.log("User = ",user);
  const [Comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (user.userData && !user.userData.isAuth) {
      return alert("Please Log in first");
    }

    const variables = {
      writer: user.userData._id,
      movieId: props.postId,
      commentBody: Comment,
      commentTime: new Date().toGMTString()
    };
    //console.log("save comment variables = ,",variables);

    axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
          console.log("comment saved: ",response.data);
        setComment("");
        props.refreshFunction(response.data.result);
      } else {
        console.log("Failed to save Comment ",response.data.err)
        alert("Failed to save Comment");
      }
    });
  };

  return (
    <div>
      <br />
      <Title level={3}> Share your opinions about {props.movieTitle} </Title>
      <hr />
      {/* Comment Lists  */}
      {/*console.log("comments= ", props.CommentLists)*/}

      {props.CommentLists &&
        props.CommentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment>
                <SingleComment
                  comment={comment}
                  postId={props.postId}
                  refreshFunction={props.refreshFunction}
                />
                
              </React.Fragment>
            )
        )}

      {props.CommentLists && props.CommentLists.length === 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          Be the first one who shares your thought about this movie
        </div>
      )}

      {/* Root Comment Form */}
      {(user.userData && user.userData.isAuth) && <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <TextArea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleChange}
          value={Comment}
          placeholder="write some comments"
        />
        <br />
        <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </Button>
      </form>}
    </div>
  );
}

export default Comments;
