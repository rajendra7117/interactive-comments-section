import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { commentsSliceActions } from "../../store/CommentsSlice";
import Modal from "./Modal";
const Buttons = ({ comment, toggleEnterReply, toggleEdit }) => {
  const [replyState, setReplyState] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispacth = useDispatch();

  const toggleReplyState = (e) => {
    setReplyState((prev) => !prev);
  };

  const toggleModal = (e) => {
    setShowModal((prev) => !prev);
  };

  const deleteComment = (e) => {
    if (comment.ownComment) {
      dispacth(
        commentsSliceActions.deleteComment({ reply: false, id: comment.id })
      );
    } else {
      dispacth(
        commentsSliceActions.deleteComment({
          reply: true,
          parentId: comment.parentId,
          id: comment.id,
        })
      );
    }
    toggleModal();
  };

  return (
    <>
      {comment.currentUser || comment.ownComment ? (
        <div className="update-buttons">
          <button onClick={toggleModal}>
            <img src="images/icon-delete.svg" />
            Delete
          </button>
          <button onClick={toggleEdit}>
            <img src="images/icon-edit.svg" />
            Edit
          </button>
        </div>
      ) : (
        <span
          className="reply"
          onMouseEnter={toggleReplyState}
          onMouseLeave={toggleReplyState}
          onClick={toggleEnterReply}
        >
          <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
              fill={replyState ? "#bdb6b6" : "#5357B6"}
            />
          </svg>

          <span className={`${replyState ? "hovered" : ""}`}>
            Reply
          </span>
        </span>
      )}
      {showModal && (
        <Modal>
          <div className="modal-container">
            <h1>Delete Comment</h1>
            <h3>
              Are u sure u want to delete the comment, once deleted it can't be
              undone
            </h3>
            <div className="modal-buttons">
              <button onClick={toggleModal}>no, Cancel</button>
              <button onClick={deleteComment}>Yes, Delete</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Buttons;
