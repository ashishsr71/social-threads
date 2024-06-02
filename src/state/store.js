import { configureStore } from "@reduxjs/toolkit";
import storyreducer from '../Slices/storyslice'
const store= configureStore({
    reducer:{
     story: storyreducer,
    }
});

export default store;