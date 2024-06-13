import { configureStore } from "@reduxjs/toolkit";
import storyreducer from '../Slices/storyslice'
import { authReducers } from "../Slices/Auith";



// store configurtion
const store= configureStore({
    reducer:{
     story: storyreducer,
     auth:authReducers
    }
});

export default store;