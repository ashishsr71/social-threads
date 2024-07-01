import axios from "axios";

import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";



export const getFollow= createAsyncThunk("follow/followers",async(data)=>{
    const id =data.id;
    const token=data.token;
    const response=await  axios.get(`${import.meta.env.VITE_API}/user/getfollow`,{headers:{token}});
    return response.data;
});

// this is to follow someonethunk
export const followSomeone=createAsyncThunk('follow/someone',async(data)=>{
    const id=data.id;
    const token=data.token;
    const response= await axios.post(`${import.meta.env.VITE_API}/user/follow/:${id}`,{},{headers:{token}});
    return response.data;
})


// state of followers
const followSlice= createSlice({
    name:"follow",
    initialState:{followers:[],following:[],requestSent:[]},
    reducers:{},
    extraReducers:(builders)=>{
        builders.addCase(getFollow.pending,(state,action)=>{
            console.log("get follow req.pending")
        }).addCase(getFollow.fulfilled,(state,action)=>{
            state.followers=[...action.payload.followers];
            state.following=[...action.payload.following];
        }).addCase(getFollow.rejected,(state,action)=>{
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
          })
    }
});


export const followReducer= followSlice.reducer;