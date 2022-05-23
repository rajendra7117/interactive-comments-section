import { createSlice, current } from "@reduxjs/toolkit";



const commentsSlice = createSlice({
    name: 'comments',
    initialState: {comments: localStorage.getItem('comments') ? JSON.parse(localStorage.getItem('comments')) : [],
                   
},
    reducers: {

        setComments(state, action){
                if(localStorage.getItem('comments')){
                    state.comments=JSON.parse(localStorage.getItem('comments'))
                }
                else{
                    state.comments=action.payload
                    localStorage.setItem('comments', JSON.stringify(state.comments))
                }
        },
        
        inCreaseVote(state, action){
            if(action.payload.replyingTo!==undefined){
             
                let id = action.payload.parentId 
                let currentId = action.payload.id
                
                let parent = state.comments[id-1]
            
                let currentComment = parent.replies[currentId-1]
               console.log(current(currentComment))
                currentComment['score']=currentComment['score']+1
               parent.replies[currentId-1]=currentComment
               state.comments[id-1]=parent
         
            }
                
               else{
                  
                let id = action.payload.id 
                let comment = state.comments[id-1]
                comment.score=comment.score+1
                state.comments[id-1] = comment
            } 
            localStorage.setItem('comments', JSON.stringify(state.comments))

        },
        decreaseVote(state, action){
            if(action.payload.replyingTo!==undefined){
                let id = action.payload.parentId 
                let currentId = action.payload.id-1

                let parent = state.comments[id-1]
                let current = parent.replies[currentId]
                current['score']=current['score']-1
               parent.replies[currentId]=current
               state.comments[id-1]=parent
            }
                
               else{
                let id = action.payload.id 
                let comment = state.comments[id-1]
                comment.score=comment.score-1
                state.comments[id-1] = comment
            } 
            localStorage.setItem('comments', JSON.stringify(state.comments))
        },
        addReply(state, action){
            let id = action.payload.parentID
            
                let comment = state.comments[id-1]
                if(comment.replies.length>0){
                    comment.replies=[...comment.replies, action.payload.reply]
                }
                else{
                    comment = {...comment, replies: [action.payload.reply]}
                }
                state.comments[id-1] = comment
                state.numberId=state.numberId+1
         
                localStorage.setItem('comments', JSON.stringify(state.comments))
           
        },
        updateComment(state, action){
            if(action.payload.reply===true){
                let id = action.payload.parentId 
                let currentId = action.payload.currentId-1
                let parent = state.comments[id-1]
                let current = parent.replies[currentId]
                current['content']=action.payload.content 
               parent.replies[currentId]=current
               state.comments[id-1]=parent
            }
                
               else{
                let id = action.payload.id 
                let comment = state.comments[id-1]
                comment.content=action.payload.content 
                state.comments[id-1] = comment
            } 
            localStorage.setItem('comments', JSON.stringify(state.comments))
        }
        ,

        deleteComment(state, action){
            console.log(action.payload)
            if(action.payload.reply){
                let id = action.payload.parentId 
                let currentId = action.payload.id
                let parent = state.comments[id-1]
                let replies = parent.replies.filter((reply) => reply.id!==currentId)
                parent.replies=replies
                state.comments[id-1] = parent
                console.log(current(parent), currentId)
            }
            else{
              let id = action.payload.id 
              state.comments = state.comments.filter((comment) => comment.id!==id)
            }
            localStorage.setItem('comments', JSON.stringify(state.comments))
        },
        addComment(state,action){
            state.comments=[...state.comments, action.payload]
            localStorage.setItem('comments', JSON.stringify(state.comments))
        }
       
    }

})

export const commentsSliceActions = commentsSlice.actions

export default commentsSlice