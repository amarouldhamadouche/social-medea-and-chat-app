import './message.css'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {format} from 'timeago.js'
export default function Message({own,text,conversation,user,timeago}) {
 const PF =  process.env.REACT_APP_PUBLIC_FOLDER
 const [friend,setFriend] = useState({})
 

 useEffect(()=>{
  
  
  const friendId = !own && conversation.members.find((m)=>m!==user._id)
  const fetchFriend = async()=>{
   try{
    const resp = await axios.get('http://localhost:8800/api/users?id=' + friendId)
    setFriend(resp.data)
   }catch(err){}
  }
  if (!own){
  fetchFriend()}
 },[user,conversation,own])
 return (
 <> 
  <div   className = { own ? 'message own': 'message'}>
   <div className="messageTop">
    { !own  
    ? <img src={friend?.profileImg ? PF + friend.profileImg : PF + 'noAvatar.png'} alt="" className="profileImgUserMssg" />
    : <></>
   }
    <p className = 'messageText'>{text} </p>
   </div>
   <span className="messageTimeAgo">{format(timeago)}</span>
   
  </div>
 </>
 )
}
