import React, { useEffect, useState } from 'react'
import axios from 'axios';
function Upload() {
    const [image,setImage]=useState(null);
    const [video,setVideo]=useState(null)
    
     useEffect(()=>{
      async function uplod(){
            let signature='';
            let timestamp=0; 
            if(image || video){
               
              await  axios.get('http://localhost:4000/getsignature',{withCredentials:true}).then(res=>{
                   signature=res.data.signature;
                   timestamp=res.data.timestamp;
                })
            };
            const data=new FormData();
            data.append("file",image||video)
            data.append("timestamp", timestamp)
            data.append("signature",signature)
            data.append("api_key",171627853614734)
           
         const {data:response} =   await axios.post("https://api.cloudinary.com/v1_1/dizyncuqs/image/upload",data);
            // console.log(response)
         const responses=await axios.post('http://localhost:4000/upload',response);
         // console.log(responses)
                
              
            
            
        };
        uplod();
       },[image,video])
    //    this is funciton to upload
    function handleupload(){}
  
  return (
    <div>
        <input type="file" onChange={(e)=>{
            if(e.target.files[0].type=='image/png'||e.target.files[0].type=='image/jpg'){setImage(e.target.files[0])
                console.log(e.target.files[0].type)
             }
             else if(e.target.files[0].type=='video'){
                setVideo(e.target.files[0])
             }
            
            }} />
        <button onClick={handleupload}>send</button></div>
  )
}

export default Upload;