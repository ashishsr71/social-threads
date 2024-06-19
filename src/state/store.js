import { configureStore } from "@reduxjs/toolkit";
import storyreducer from '../Slices/storyslice'
import { authReducers } from "../Slices/Auith";
import { postReducer } from "../Slices/postSlice";



// store configurtion
const store= configureStore({
    reducer:{
     story: storyreducer,
     auth:authReducers,
     post:postReducer
    }
});

export default store;