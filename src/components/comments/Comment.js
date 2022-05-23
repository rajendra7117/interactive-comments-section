import React, { useState } from "react";
import "./Comment.css";
import Comments from "./Comments";
import Vote from "./Vote";
import Reply from "./Reply";
import Content from "./Content";
import Buttons from "./Buttons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { commentsSliceActions } from "../../store/CommentsSlice";
import DateConversion from "./DateConversion";


const Comment = ({ comment }) => {
  const dispacth = useDispatch()
  const comments = useSelector(state => state.comments.comments)
  const [enterReply, setEnterReply] = useState(false);
  const [edit, setEdit] = useState(false)
  const [editContent, setEditContent] = useState(`${comment.ownComment ? '' : `@${comment.replyingTo}, `}${comment.content}`)

  const handleEditChange = e => {
    setEditContent(e.target.value)
  }
  const toggleEdit = e => {
    setEdit(prev => !prev)
  }
  
  let img = comment.user.image.webp;
  img = img.substring(1, img.length);

  
  const toggleEnterReply = (e) => {
    setEnterReply((prev) => !prev);
  };
  const updateComment = e => {
    if(!comment.ownComment){
      let id = editContent.indexOf(',')
      let content = editContent.substring(id+2, editContent.length)
      dispacth(commentsSliceActions.updateComment({reply: true, parentId: comment.parentId, content: content, currentId: comment.id}))
    }
    else{
      dispacth(commentsSliceActions.updateComment({reply:false, id: comment.id, content: editContent}))
    }
  
    toggleEdit()
  }


  let replyLength = 0;
  if (comment.replies?.length > 0) {
    replyLength = comment.replies.length;
  }
 if(comment.parentId===2){
  replyLength = comments[1].replies.length
 }

  return (
    <>
      <div className={`comment ${comment.replyingTo!==undefined ? 'comment-reply' : ''}`}>
        <div className="comment-data">
          <Vote score={comment.score} comment={comment} />
          <div className="comment-info">
            <div className="info">
              <div className="details">
                <img src={img} />
                <h3>{comment.user.username}</h3>
                {comment.currentUser && (<span className="you">you</span>)}
                <DateConversion createdDate={comment.createdAt}/>
              </div>
             <Buttons comment={comment} toggleEnterReply={toggleEnterReply} toggleEdit={toggleEdit} />
            </div>
            {edit ? <textarea rows={4} cols={70} value={editContent} onChange={handleEditChange} className="edit-text"/> :(<Content comment={comment}/>) }
            {edit && (<button className="update-button" onClick={updateComment}>Update</button>)}
          </div>
        </div>
      </div>
      {enterReply && (
        <Reply
          id={comment.parentId > 0 ? comment.parentId : comment.id}
          username={comment.user.username}
          toggleReply={toggleEnterReply}
          replyLength={replyLength}
        />
      )}
      <div className="replies">
        {comment.replies?.length > 0 && <Comments comments={comment.replies} />}
      </div>
    </>
  );
};

export default Comment;
