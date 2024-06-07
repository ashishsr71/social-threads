import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjYxZjI0ZTlmZjkzZjdjYTk5Yzg2MjIiLCJpYXQiOjE3MTc3ODEyMTUsImV4cCI6MTcxNzg2NzYxNX0.RhoMQaezDBYeWGDe24ArjCSeNtX1eGQ2234E8SYWnSA"
export const storythunk= createAsyncThunk('story/thunk',async()=>{
    const response= await axios.get("http://localhost:4000/user/getStory",{ 'headers': { token}});
    // console.log(response.data)
    return response.data;
})





const initialState={
    stories:[{userid:212,media:[{video:'https://pixabay.com/videos/beach-ocean-sunset-sea-nature-sky-201308/'}],
userimg:'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png'

}],

}

const storySlice= createSlice({
    name:'story',
    initialState,
    reducers:{},
    extraReducers:(builders)=>{
      builders.addCase(storythunk.fulfilled,(state,action)=>{
         state.stories=[...action.payload];
      })
    }
    
});


export default storySlice.reducer;