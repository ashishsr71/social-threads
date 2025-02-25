import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjYxZjI0ZTlmZjkzZjdjYTk5Yzg2MjIiLCJpYXQiOjE3MTc3ODEyMTUsImV4cCI6MTcxNzg2NzYxNX0.RhoMQaezDBYeWGDe24ArjCSeNtX1eGQ2234E8SYWnSA"
export const storythunk= createAsyncThunk('story/thunk',async({token})=>{
    const response= await axios.get(`${import.meta.env.VITE_API}/user/getStory`,{ 'headers': { token},withCredentials:true});
    // console.log(response.data)
    return response.data;
});

export const addStory= createAsyncThunk('story/add',async({token,data})=>{
    const response= await axios.post(`${import.meta.env.VITE_API}/user/addStory`,data,{ 'headers': { token},withCredentials:true});
    // console.log(response.data)
    return response.data;
});





const initialState={
  stories:[],pending:false,error:null
}

const storySlice= createSlice({
    name:'story',
    initialState,
    reducers:{},
    extraReducers:(builders)=>{
      builders.
      addCase(storythunk.pending,(state)=>{
        state.pending=true;
      })
      .addCase(storythunk.fulfilled,(state,action)=>{
        state.pending=false;
         state.stories=[...action.payload];
      }).addCase(storythunk.rejected,(state,action)=>{
        state.pending=false;
         state.error='something went wrong'
      }).addCase(addStory.pending,(state)=>{
        console.log('add story req pending')
      }).addCase(addStory.fulfilled,(state,action)=>{
        console.log("story req fulfilled")
        if(state.stories.length){
          if(state.stories.findIndex(item=>item._id==action.payload.userId)>-1){
            let index=state.stories.findIndex(item=>item._id==userId);
            state.stories[index].stories.push(action.payload);
          }else{
            // console.log('i am form inside')
            state.stories.push({_id:action.payload.userId,stories:[{...action.payload}]})
          }
        }else{
          // console.log("i am  from out")
          state.stories.push({_id:action.payload.userId,stories:[{...action.payload}]});
        }
        
        // state.stories[0]={_id:action.payload.userId,stories:[action.payload,...state.stories[0]]}
      }).addCase(addStory.rejected,()=>{
        console.log('ads req concelled')
      })
    }
    
});


export default storySlice.reducer;