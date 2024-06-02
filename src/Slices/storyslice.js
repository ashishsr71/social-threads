import { createSlice } from "@reduxjs/toolkit";


const initialState={
    stories:[{userid:212,media:[{video:'https://pixabay.com/videos/beach-ocean-sunset-sea-nature-sky-201308/'}],
userimg:'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png'

}],

}

const storySlice= createSlice({
    name:'story',
    initialState,
    reducers:{},
    extraReducers:(builders)=>{

    }
    
});


export default storySlice.reducer;