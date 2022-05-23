import { configureStore } from "@reduxjs/toolkit";
import commentsSlice from "./CommentsSlice";
const store = configureStore({
    reducer:{
        comments: commentsSlice.reducer
    }
})

export default store