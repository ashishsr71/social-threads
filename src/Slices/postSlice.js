import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


 export const createPostThunk= createAsyncThunk('create/post',async({data,token})=>{
    const response =await axios.post(`${import.meta.env.VITE_API}/user/createpost`,data,{headers:{token:token}});
    // console.log(response);
    return response.data;
});
export const deletePostThunk= createAsyncThunk('delete/post',async(id)=>{
    const response = axios.delete();
    return response.data
});

export const likePostThunk= createAsyncThunk('like/post',async({id,token})=>{
    const response = await axios.put(`${import.meta.env.VITE_API}/user/likepost/${id}`,{},{headers:{token:token}});
   
    return response.data
});
// get the posts of the user itself
export const getPostsThunk= createAsyncThunk('get/posts',async(token,{getState,rejectWithValue})=>{
    
        const response = await  axios.get(`${import.meta.env.VITE_API}/user/getposts`,{headers:{token:token}});
        // console.log(response.data)
       
            return response.data;
            
});

export const getforFeed= createAsyncThunk('get/feed',async({token},{getState,rejectWithValue})=>{
    
    const response = await  axios.get(`${import.meta.env.VITE_API}/user/getfollowposts`,{headers:{token:token}});
    // console.log(response.data)
   
        return response.data;
});

export const getSinlgePost=createAsyncThunk('get/single',async({id,token})=>{
    const response = await axios.get(`${import.meta.env.VITE_API}/user/getpost/${id}`,{headers:{token:token}});
     return response.data;
});

export const getOtherUserPost=createAsyncThunk('get/otheruser',async({id,token})=>{
    const response = await axios.get(`${import.meta.env.VITE_API}/user/getotherposts/${id}`,{headers:{token:token}});
     return response.data;
});

export const rePost=createAsyncThunk('repost/thunk',async({token,id})=>{
const response=await axios.post(`${import.meta.env.VITE_API}/user/repost/${id}`,{},{headers:{token:token}});
return response.data;
});





const postSlice= createSlice({
    name:"post",
    initialState:{currentPost:null,posts:[],error:null,totalPosts:0,pending:false,likePending:false},
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
            state.pending=true;
            //  console.log('getpost request pending')
        }).addCase(getPostsThunk.fulfilled,(state,action)=>{
            // console.log('req fullfilled')
            // console.log(action.payload)
            state.pending=false;
        //    state.myPosts=[...action.payload];
           state.posts=[...action.payload]
        }).addCase(getPostsThunk.rejected,(state,action)=>{
            //  console.log(action.error)
            state.pending=false;
            // console.log(action.error.message)
        }).addCase(getSinlgePost.pending,(state,action)=>{
            // console.log('getSinlgePost request pending')
            state.pending=true;
       }).addCase(getSinlgePost.fulfilled,(state,action)=>{
        //    console.log('req fullfilled for getSinlgePost')
        state.pending=false;
         state.currentPost=action.payload;
       }).addCase(getSinlgePost.rejected,(state,action)=>{
           //  console.log(action.error)
           state.pending=false;
        //    console.log(action.error.message)
       }).addCase(getforFeed.pending,(state,action)=>{
        // console.log('getforFeed request pending')
        state.pending=true;
   }).addCase(getforFeed.fulfilled,(state,action)=>{
    //    console.log('req fullfilled for getforFeed')
       state.pending=false;
     state.posts=action.payload;
   }).addCase(getforFeed.rejected,(state,action)=>{
    state.pending=false;
       //  console.log(action.error)
    //    console.log(action.error.message)
   }).addCase(getOtherUserPost.pending,(state,action)=>{
   state.pending=true;
})
.addCase(getOtherUserPost.fulfilled,(state,action)=>{
//    console.log('getOtherUserPost fullfilled')
   console.log(action.payload)
   state.pending=false;
  state.posts=[...action.payload];
})

.addCase(getOtherUserPost.rejected,(state,action)=>{
    state.pending=false;
   console.log(action.error.message)
})

.addCase(likePostThunk.fulfilled,(state,action)=>{
    
        const newPosts= state.posts.map(post=>{
            if(post._id===action.payload.doc._id){
          
             return action.payload.doc;
            };
            return post;
        });
         state.posts= newPosts;
   
    

}).addCase(rePost.fulfilled,(state,action)=>{
  console.log(action.payload);
})
    }

});





export const postReducer= postSlice.reducer;