import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import Axios from "axios";
import { useSelector } from "react-redux";
import LikeDislikes from "./LikeDislikes";
import ReplyComment from "./ReplyComment";
const { TextArea } = Input;
function SingleComment(props) {//console.log(props.comment);
  const user = useSelector((state) => state.user);
  const [CommentValue, setCommentValue] = useState("");
  const [OpenReply, setOpenReply] = useState(false);

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const openReply = () => {
    setOpenReply(!OpenReply);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      writer: user.userData._id,
      commentId: props.comment._id,
      commentBody: CommentValue,
      commentTime: new Date().toGMTString(),
    };
    //console.log(variables);

    Axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if (response.data.success) {
                console.log(response.data);
                setCommentValue("")
                setOpenReply(!OpenReply)
                props.refreshFunction(response.data.result)
            } else {
                console.log(response.data.err)
                alert('Failed to save Comment')
            }
        })
  };

  const actions = [
    <LikeDislikes
      comment
      commentId={props.comment._id}
      userId={localStorage.getItem("userId")}
    />,
    (user.userData && user.userData.isAuth) && <span onClick={openReply} key="comment-basic-reply-to">
      Reply to{" "}
    </span>
  ];
  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt="image" />}
        content={<p>{props.comment.commentBody}</p>}
      ></Comment>
      <ReplyComment style={{marginLeft:'5px'}} parentCommentId={props.comment._id} />

      { OpenReply && (
        <form style={{ display: "flex",marginLeft:'5px' }} onSubmit={onSubmit}>
          <TextArea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={handleChange}
            value={CommentValue}
            placeholder="write some comments"
          />
          <br />
          <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            Submit
          </Button>
        </form>
      )}

    </div>
  );
}

export default SingleComment;
