import React, { useEffect, useState } from "react";
import { Button, Tooltip } from "antd";
//import Icon from '@ant-design/icons';
import Icon from "@mui/material/Icon";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Axios from "axios";
import { useSelector } from "react-redux";
import "antd/dist/antd.css";
//import Icon from 'antd/lib/icon';

function LikeDislikes(props) {
  const user = useSelector((state) => state.user);
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);
  let variable = {};

  if (props.commentId) {
    variable = {
      userId: props.userId,
      commentId: props.commentId,
      timestamp: new Date().toGMTString(),
    };
  } else {
    variable = {
      userId: props.userId,
      movieId: props.movieId,
      timestamp: new Date().toGMTString(),
    };
  }
  
  useEffect(() => {
    Axios.post("/api/like/getLikes", variable).then((response) => {
      //console.log("getLikes", response.data);

      if (response.data.success) {
        if (response.data.likes) {
          setLikes(response.data.likes.length);
        }
        //if I already click this like button or not
        response.data.likes.map((like) => {
          if (like.userFrom === props.userId) {
            setLikeAction("liked");
            setDislikeAction(null);
          }
        });
      } else {
        alert("Failed to get likes");
      }
    });

    Axios.post("/api/like/getDislikes", variable).then((response) => {
      //console.log("getDislike ", response.data);
      if (response.data.success) {
        setDislikes(response.data.dislikes.length);
        //if I already click this like button or not
        response.data.dislikes.map((dislike) => {
          if (dislike.userFrom === props.userId) {
            setDislikeAction("disliked");
            setLikeAction(null);
          }
        });
      } else {
        alert("Failed to get dislikes");
      }
    });
  }, []);

  const onLike = () => {debugger;
    //console.log("onLikeDisLike");
    if (user.userData && !user.userData.isAuth) {
      return alert("Please Log in first");
    }

    if (LikeAction === null) {
      Axios.post("/api/like/upLike", variable).then((response) => {
        if (response.data.success) {
          //console.log("data from axios ",response.data.data);
          setLikes(Likes + 1);
          setLikeAction("liked");
          //If dislike button is already clicked
          if (DislikeAction !== null) {
            setDislikeAction(null);
            setDislikes(Dislikes - 1);
          }
        } else {
          alert("Failed to increase the like");
        }
      });
    } else {
      Axios.post("/api/like/unLike", variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes - 1);
          setLikeAction(null);
        } else {
          alert("Failed to decrease the like");
        }
      });
    }
  };

  const onDisLike = () => {debugger;
    if (user.userData && !user.userData.isAuth) {
      return alert("Please Log in first");
    }

    if (DislikeAction !== null) {
      Axios.post("/api/like/unDisLike", variable).then((response) => {
        if (response.data.success) {debugger;
          setDislikes(Dislikes - 1);
          setDislikeAction(null);
        } else {
          console.log("Failed to descrease dislike");
          alert("Failed to decrease dislike");
        }
      });
    } else {
      Axios.post("/api/like/upDisLike", variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes + 1);
          setDislikeAction("disliked");
          //If dislike button is already clicked
          if (LikeAction !== null) {
            setLikeAction(null);
            setLikes(Likes - 1);
          }
        } else {
            console.log("failed to increase dislike");
          alert("Failed to increase dislike");
        }
      });
    }
  };

  return (
    <React.Fragment>
      <span key="comment-basic-like">
        <span style={{ marginLeft: "15px", marginTop: "7px" }}>
          <Tooltip title="Like" onClick={()=>{onLike()}}>
            {LikeAction != "liked" ? <ThumbUpOutlinedIcon /> : <ThumbUpIcon />}
          </Tooltip>
        </span>
        <span style={{ paddingLeft: "2px", cursor: "auto" }}>{Likes}</span>
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span key="comment-basic-dislike">
        <span style={{ marginLeft: "15px", marginTop: "7px" }}>
          <Tooltip title="Dislike" onClick={()=>{onDisLike()}}>
            {DislikeAction != "disliked" ? (
              <ThumbDownOffOutlinedIcon />
            ) : (
              <ThumbDownIcon />
            )}
          </Tooltip>
        </span>
        <span style={{ paddingLeft: "2px", cursor: "auto" }}>{Dislikes}</span>
      </span>
    </React.Fragment>
  );
}

export default LikeDislikes;
