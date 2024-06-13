import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// login thunk


export const loginThunk=createAsyncThunk('login/thunk',async(data)=>{
const response= await axios.post("http://localhost:4000/user/login",data);
console.log(response.data)
return response.data;
});


 export const signupThunk=createAsyncThunk('signup/thunk',async(data)=>{
    const response= await axios.post("http://localhost:4000/user/signup",data);
    console.log(response.data)
    return response.data;
});










// this is initialstate
const user={userId:null,
    token:'',pending:false,
    error:''
};


const AuthSlice=createSlice({
    name:'auth',
    initialState:user,
    reducers:{},
    extraReducers:(builders)=>{
        builders.addCase(loginThunk.pending,(state)=>{
            state.pending=true;
        })
        .addCase(loginThunk.fulfilled,(state,action)=>{
            state={...state,userId:action.payload?.userId,
                pending:false,token:action.payload.token

            };
            localStorage.setItem('token',action.payload.token);

        })
        .addCase(loginThunk.rejected,(state,action)=>{
            state.error=action.payload
            state.pending=false;
        })
        .addCase(signupThunk.pending,(state,action)=>{
             state.pending=true;
        }).addCase(signupThunk.fulfilled,(state,action)=>{
            state={...state,userId:action.payload?.userId,
                pending:false,token:action.payload.token};
                localStorage.setItem('token',action.payload.token);
        }).addCase(signupThunk.rejected,(state,action)=>{
            state.error=action.payload
            state.pending=false;
        })
        }
    
});





export const authReducers=AuthSlice.reducer;