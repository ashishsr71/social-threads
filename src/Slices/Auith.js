import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// login thunk


export const loginThunk=createAsyncThunk('login/thunk',async(data)=>{
    console.log(import.meta.env.API)
const response= await axios.post(`${import.meta.env.VITE_API}/user/login`,data);
console.log(response.data)
return response.data;
});


 export const signupThunk=createAsyncThunk('signup/thunk',async(data)=>{
 
    const response= await axios.post(`${import.meta.env.VITE_API}/user/signup`,data);
    console.log(response.data)
    return response.data;
});

export const refreshToken= createAsyncThunk('refresh/token',async(_,{getState,rejectWithValue})=>{
    const { refreshToken } = getState().auth;
    console.log(refreshToken)
      const response = await axios.post(`${import.meta.env.VITE_API}/user/refreshtoken`, { refreshToken });
      return response.data;
      console.log(response);
    
});








// this is initialstate
const user={userId:null,
    token:'',pending:false,
    error:'', refreshToken:null,
};


const AuthSlice=createSlice({
    name:'auth',
    initialState:user,
    reducers:{
        logout:(state,action)=>{return {userId:null,
            token:'',pending:false,
            error:''
        };
       
      
        }
    },
    extraReducers:(builders)=>{
        builders.addCase(loginThunk.pending,(state)=>{
            state.pending=true;
        })
        .addCase(loginThunk.fulfilled,(state,action)=>{
            localStorage.setItem('token',action.payload?.token);
            return {...state,userId:action.payload?.userId,
                pending:false,token:action.payload?.token,
                error:'',refreshToken:action.payload?.refreshToken

            };
           

        })
        .addCase(loginThunk.rejected,(state,action)=>{
            state.error=action.payload
            state.pending=false;
        })
        .addCase(signupThunk.pending,(state,action)=>{
             state.pending=true;
        }).addCase(signupThunk.fulfilled,(state,action)=>{
            localStorage.setItem('token',action.payload?.token);
            return {...state,userId:action.payload?.userId,
                pending:false,token:action.payload?.token,
                error:'',refreshToken:action.payload?.refreshToken

            };
        }).addCase(signupThunk.rejected,(state,action)=>{
            state.error=action.payload
            state.pending=false;
        }).addCase(refreshToken.pending,(state)=>{
               console.log('refresh pending')
        }).addCase(refreshToken.fulfilled,(state,action)=>{
            state.token=action.payload;
            console.log(action.payload)
        }).addCase(refreshToken.rejected,(state,action)=>{
            state.error=action?.error?.message
            console.log(action.error.message);
        })
        }
    
});





export const authReducers=AuthSlice.reducer;
export const logout= AuthSlice.actions.logout;