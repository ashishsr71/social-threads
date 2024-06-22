import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


 export const createPostThunk= createAsyncThunk('create/post',async({data,token})=>{
    const response =await axios.post(`${import.meta.env.VITE_API}/user/createpost`,data,{headers:{token:token}});
    console.log(response);
    return response.data;
});
export const deletePostThunk= createAsyncThunk('delete/post',async(id)=>{
    const response = axios.delete();
    return response.data
});

export const likePostThunk= createAsyncThunk('like/post',async(id)=>{
    const response = axios.put();
    return response.data
});

export const getPostsThunk= createAsyncThunk('get/posts',async(token)=>{
    const response = await  axios.get(`${import.meta.env.VITE_API}/user/getposts`,{headers:{token}});
    console.log(response.data)
    return response.data
});





const postSlice= createSlice({
    name:"post",
    initialState:{posts:[],error:null,totalPosts:0,pending:false,},
    reducers:{},
    extraReducers:(builders)=>{
        builders.addCase(createPostThunk.pending,(state,action)=>{
                return {...state,pending:true}
        })
        .addCase(createPostThunk.fulfilled,(state,action)=>{
            return {posts:[...state.posts,action.payload],pending:false,...state}
        })
        .addCase(createPostThunk.rejected,(state,action)=>{
            return {...state,pending:false,error:"something went wrong"}
        }).addCase(getPostsThunk.pending,(state,action)=>{
             console.log('getpost request pending')
        }).addCase(getPostsThunk.fulfilled,(state,action)=>{
            console.log('req fullfilled')
            return {...state,posts:[...action.payload]}
        }).addCase(getPostsThunk.rejected,(state,action)=>{
            console.log('req rejected')
        })
    }

});





export const postReducer= postSlice.reducer;