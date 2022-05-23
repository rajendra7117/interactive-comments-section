import React, {useEffect, useState} from 'react'
import './Comments.css'

import Comment from './Comment'
import AddComment from './AddComment'
const Comments = ({comments}) => {
  

  
  return (

    <div className='comments'>
        {comments?.map((comment) => {
          
        
            return <Comment key={comment.id} comment={comment} />
         
        })}
        
    </div>
  )
}

export default React.memo(Comments)