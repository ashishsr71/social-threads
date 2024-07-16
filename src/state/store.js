import { configureStore } from "@reduxjs/toolkit";
import storyreducer from '../Slices/storyslice'
import { authReducers } from "../Slices/Auith";
import { postReducer } from "../Slices/postSlice";
import { refreshToken } from "../Slices/Auith";
import { followReducer } from "../Slices/follow";
import { commentReducer } from "../Slices/commentSlice";




const refreshTokenMiddleware = (storeApi) => (next) => async (action) => {
    if (action.error && action.error.message === 'Request failed with status code 401') {
      console.log("Received 401 status code. Initiating token refresh...");
     await  storeApi.dispatch(refreshToken());
    //   await next(refreshToken());
    return next(action);
    } else {
      next(action);
    }
  };

//   const middleware = createMiddleware({
//     preloadedState: {},
//     thunk: refreshTokenMiddleware,
//   });

// store configurtion
const store= configureStore({
    reducer:{
     story: storyreducer,
     auth:authReducers,
     post:postReducer,
     follow:followReducer,
     comment:commentReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(refreshTokenMiddleware),
});

export default store;