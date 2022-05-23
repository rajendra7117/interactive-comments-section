import React, {useEffect, useState} from 'react'
import './App.css';
import Comments from './components/comments/Comments';
import {useDispatch, useSelector } from 'react-redux'
import {commentsSliceActions} from './store/CommentsSlice'
import AddComment from './components/comments/AddComment';
function App() {


  const comments1 = useSelector((state) => state.comments.comments)
 
  const dispacth = useDispatch()
  const fetchComments = async () => {
    const response = await fetch('/data.json')
    const data = await response.json()

      dispacth(commentsSliceActions.setComments(data.comments))
  }
 

  useEffect(() => {
      fetchComments()
  }, [])


 
  return (
    <div className="App">
      {comments1?.length>0 && ( <Comments comments={comments1}/>)}
      <AddComment />
    </div>
  );
}

export default App;
