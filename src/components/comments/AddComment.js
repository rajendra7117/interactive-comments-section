import React, {useState} from 'react'
import './AddComment.css'
import { useSelector, useDispatch } from 'react-redux'
import { commentsSliceActions } from '../../store/CommentsSlice'
const AddComment = () => {
    const comments = useSelector(state => state.comments.comments)
    const dispacth = useDispatch()
  let todaysDate = new Date()
    const [enteredText, setEnteredText] = useState('')
    const handleText = e => {
        setEnteredText(e.target.value)
    }
  
    const submitHandler = e => {
        e.preventDefault()
        if(enteredText===""){
          return
        }
        let comment = {
            "id": comments.length+1,
            "content": enteredText,
            "createdAt": `${todaysDate}`,
            "score": 0,
            "ownComment": true,
            "user": {
              "image": { 
                "png": "./images/avatars/image-juliusomo.png",
                "webp": "./images/avatars/image-juliusomo.webp"
              },
              "username": "juliusomo"
            }
          }
        dispacth(commentsSliceActions.addComment(comment))
        setEnteredText('')
    }
  return (
    <div className='addCommentContainer'>
         <form onSubmit={submitHandler}>
    <div className='comment-input'>
     
        <div><img src='images/avatars/image-juliusomo.png'/></div>
        <textarea rows='5' cols='70' className='text-field' onChange={handleText} value={enteredText} placeholder="Add Comment"/>
        <button type="submit">Send</button>

    </div>
    </form>
    </div>
  )
}

export default React.memo(AddComment)