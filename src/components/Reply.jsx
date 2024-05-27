import React from 'react'
import Comment from './comment'
function Reply({onOpen,onClose}) {
      // will get an array of comments 
      // render it using map method 
      const arr=new Array(5).fill("");
  return (
      <>
  <span onClick={onOpen}>repli</span>
    { arr.map((item)=>{
      return <Comment/>
    })}</>
  )
}

export default Reply