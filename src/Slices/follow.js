import axios from "axios";

import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";



export const getFollow= createAsyncThunk("follow/followers",async({token})=>{
    // const id =data.id;
    // const token=data.token;
    const response=await  axios.get(`${import.meta.env.VITE_API}/user/getfollow`,{headers:{token},withCredentials:true});
    // console.log(response)
    return response.data;
});

// this is to follow someonethunk
export const followSomeone=createAsyncThunk('follow/someone',async(data)=>{
    const id=data.id;
    const token=data.token;
    const response= await axios.post(`${import.meta.env.VITE_API}/user/follow/${id}`,{},{headers:{token},withCredentials:true});
    return response.data;
});

// this thunk will get you the useryou want to get information
export const getUser= createAsyncThunk('get/someone',async({id,token})=>{
    const response=await axios.get(`${import.meta.env.VITE_API}/user/getuser/${id}`,{headers:{token},withCredentials:true});
    return response.data;
})


// state of followers
const followSlice= createSlice({
    name:"follow",
    initialState:{username:'',followers:[],following:[],requestSent:[],pending:false,userData:null,userImg:''},
    reducers:{},
    extraReducers:(builders)=>{
        builders.addCase(getFollow.pending,(state,action)=>{
            console.log("get follow req.pending")
            state.pending=true;
        }).addCase(getFollow.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.username=action.payload.username;
            state.followers=[...action.payload.followers];
            state.following=[...action.payload.following];
            state.userImg=action.payload.userImg;
            state.pending=false;
        }).addCase(getFollow.rejected,(state,action)=>{
            state.pending=false;
            console.log(action.error.message);
        }).addCase(followSomeone.pending,(state,action)=>{
            console.log("follow req pending");
        })
          .addCase(followSomeone.fulfilled,(state,action)=>{
            if(action.payload.message){
                console.log("request sent");
             

            }else{
                state.following.push(action.payload.id);
                console.log("followed");
            }
            
          })
          .addCase(followSomeone.rejected,(state,action)=>{
            console.log("follow someone req rejected");
          }).addCase(getUser.pending,(state,action)=>{
            console.log("get user pending")
            state.pending=true;
        }).addCase(getUser.fulfilled,(state,action)=>{
            console.log(action.payload);
            // state.followers=[...action.payload.followers];
            // state.following=[...action.payload.following];
            console.log("get user fulfilled")
            state.userData=action.payload;
            state.pending=false;
        }).addCase(getUser.rejected,(state,action)=>{
            state.pending=false;
            console.log(action.error.message);
        })
    }
});


export const followReducer= followSlice.reducer;