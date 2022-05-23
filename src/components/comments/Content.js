import React from 'react'

const Content = ({comment}) => {

   
  return (
    <div className="content">
              {comment.currentUser ? (
                <p>
                  <span className="replyingTo">@{comment.replyingTo}, </span> {comment.content}
                </p>
              ) : (
                <p>
                  {comment.replyingTo && (
                    <span className="replyingTo">{`@${comment.replyingTo}, `}</span>
                  )}
                  {comment.content}
                </p>
              )}
            </div>
  )
}

export default React.memo(Content)