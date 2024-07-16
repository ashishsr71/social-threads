import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const addComment= createAsyncThunk('add/comment',async({id,token,body})=>{
const response= await axios.post(`${import.meta.env.VITE_API}/user/newcomment/${id}`,body,{headers:{token}});
return response.data;
})

const commentSlice=createSlice({
    name:"comment",
    initialState:{newcomment:null,allComments:[],pending:false,error:null},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addComment.pending,(state,action)=>{
           console.log("pending")
           state.newcomment=null;
           state.error=null;
           state.pending=true;
        }).addCase(addComment.fulfilled,(state,action)=>{
            state.error=null;
            state.pending=false;
        state.newcomment=action.payload;
        state.allComments.push(action.payload);
        }).addCase(addComment.rejected,(state,action)=>{
            state.pending=false;
            state.error="something went wrong";
           console.log("fulfilled")
        })
    }
});







export const commentReducer= commentSlice.reducer;
