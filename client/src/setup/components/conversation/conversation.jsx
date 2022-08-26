import './conversation.css'
import {useState,useEffect} from 'react'
import axios from 'axios'

export default function Conversation({conversation,user}) {
 const [friend,setFriend] = useState({})

 useEffect(()=>{
  const friendId = conversation.members.find((m)=>m!==user._id)
  const getFriend = async()=>{
   try{
   const resp = await axios.get('http://localhost:8800/api/users?id=' + friendId)
   setFriend(resp.data)
  }catch(err){
  }
  }
  getFriend() 
 },[user,conversation])
 const PF = process.env.REACT_APP_PUBLIC_FOLDER
 return (
 <> 
  <div className = 'conversation'>
   <img className = 'conversationImg' src = {friend.profileImg 
                                              ? PF + friend.profileImg
                                              : PF + 'noAvatar.png'}
                   alt = ''/>
   <span className="conversationUsername"> {friend?.username} </span>
  </div>
 </>
 )
}
