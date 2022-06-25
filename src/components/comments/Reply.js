import React, {useState} from 'react'
import './Reply.css'
import { commentsSliceActions } from '../../store/CommentsSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
const Reply = ({id, username, toggleReply, replyLength}) => {

 const numberId = useSelector(state => state.comments.numberId)
  const [enteredText, setEnteredText] = useState(`@${username}, `)
  let todayDate = new Date()
  const dispacth = useDispatch()

  const handleText = e => {
   setEnteredText(e.target.value)
  }

  const submitHandler = e => {
    let ind = enteredText.indexOf(',')
    let text = enteredText.substring(ind+2, enteredText.length)
    e.preventDefault()
   if(text.trim()===""){
    return
   }
    let comment = {
      "id": replyLength+1,
      "content": text,
      "createdAt": `${todayDate}`,
      "score": 0,
      "replyingTo": username,
      "parentId": id,
      "currentUser": true,
      "user": {
        "image": { 
          "png": "./images/avatars/image-juliusomo.png",
          "webp": "./images/avatars/image-juliusomo.webp"
        },
        "username": "juliusomo"
      }
    }
    dispacth(commentsSliceActions.addReply({parentID: id, reply: comment}))
    toggleReply()
  }

  return (
    <form onSubmit={submitHandler}>
    <div className='reply-input'>
     
        <div><img src='images/avatars/image-juliusomo.png'/></div>
        <textarea rows='5' cols='70' className='text-field' onChange={handleText} value={enteredText}/>
        <div className='reply-buttons'>
        <button type="submit">Reply</button>
        <button className='cancel-reply' onClick={() => toggleReply()}>cancel</button>
        </div>

    </div>
    </form>
  )
}

export default React.memo(Reply);