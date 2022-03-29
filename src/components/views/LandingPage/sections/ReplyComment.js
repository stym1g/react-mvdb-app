import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment';
import { Comment, Avatar, } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

function ReplyComment(props) {
    const user = useSelector((state) => state.user);
    const [ChildCommentNumber, setChildCommentNumber] = useState(0);
    const [OpenReplyComments, setOpenReplyComments] = useState(false);
    const [commentLists,setCommentLists] = useState([]);
    // useEffect(() => {

    //     let commentNumber = 0;
    //     props.CommentLists.map((comment) => {

    //         if (comment.responseTo === props.parentCommentId) {
    //             commentNumber++
    //         }
    //     })
    //     setChildCommentNumber(commentNumber)
    // }, [props.CommentLists, props.parentCommentId])
    useEffect(()=>{ 
        axios.post('/api/comment/getComments', {commentId:props.parentCommentId})
        .then(response=>{
            //console.log(response);
            if(response.data.success){
                //console.log("response.data.comments: ",response.data.comments);
                setCommentLists(response.data.comments);
            }else{
                console.log("Failed to get comments");
            }
        })
    },[commentLists]);


    let renderReplyComment = (parentCommentId) =>
        props.CommentLists.map((comment, index) => (
            <React.Fragment>
                {comment.responseTo === parentCommentId &&
                    <div style={{ width: '80%', marginLeft: '40px' }}>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} parentCommentId={comment._id} postId={props.postId} refreshFunction={props.refreshFunction} />
                    </div>
                }
            </React.Fragment>
        ))

    const handleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }


    return (
        <div>

            {ChildCommentNumber > 0 &&
                <p style={{ fontSize: '14px', margin: 0, color: 'gray' }}
                    onClick={handleChange} >
                    View {ChildCommentNumber} more comment(s)
             </p>
            }

            {OpenReplyComments &&
                props.CommentLists && props.CommentLists.map((comment,index)=>{
                    return (
                        <Comment
                
                author={comment.writer.name}
                avatar={<Avatar src={comment.writer.image} alt="image" />}
                content={<p>{comment.commentBody}</p>}
              ></Comment>
                    );
                })
            }

        </div>
    )
}

export default ReplyComment
