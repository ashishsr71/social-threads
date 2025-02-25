import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const addComment= createAsyncThunk('add/comment',async({id,token,body})=>{
const response= await axios.post(`${import.meta.env.VITE_API}/user/newcomment/${id}`,body,{withCredentials:true,headers:{token}});
return response.data;
});
export const getAllcomments= createAsyncThunk('all/comments',async({id,token})=>{
const response= await axios.get(`${import.meta.env.VITE_API}/user/getcomments/${id}`,{headers:{token},withCredentials:true});
return response.data;
});
export const replyComment=createAsyncThunk("reply/comment",async({id,token,body})=>{
    const response= await axios.put(`${import.meta.env.VITE_API}/user/replycomment/${id}`,body,{headers:{token},withCredentials:true});
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
        }).addCase(replyComment.pending,(state,action)=>{
             console.log("req pending")
        }).addCase(replyComment.fulfilled,(state,action)=>{
            state.newcomment=action.payload;
        }).addCase(replyComment.rejected,(state,action)=>{
            console.log("reply rejected")
        }).addCase(getAllcomments.pending,(state,action)=>{
            console.log("req pending all comments")
            state.allComments=[]
            state.error=null;
            state.pending=true;
       }).addCase(getAllcomments.fulfilled,(state,action)=>{
       console.log("i am working")
        state.pending=false;
        state.allComments=[...action.payload];
       }).addCase(getAllcomments.rejected,(state,action)=>{
        state.pending=false;
        state.error="something went wrong";
       })
    }
});







export const commentReducer= commentSlice.reducer;
