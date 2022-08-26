import {useContext, useState,useEffect } from 'react'
import './feed.css'
import Share from '../share/share.jsx'
import Post from '../post/post'
import  {AuthContext} from '../../contexs/AuthContex'

import axios from 'axios'
export default function Feed ({username}){
  const {user} = useContext(AuthContext)
  const [Posts,setPosts] = useState([])
useEffect(()=>{
  const fetchPost = async()=>{
    const resp = username 
    ?await axios.get("http://localhost:8800/api/post/profile/" + username)
    :await axios.get("http://localhost:8800/api/post/timeLine/" + user._id)
    setPosts(resp.data.sort((p1, p2) => {
      return new Date(p2.createdAt) - new Date(p1.createdAt);
    }))
     

  }
  fetchPost()
},[username,user._id])
 return (<>
 <div className="feed">
  <div className="feedWrapper">

   {(!username || username ===user.username) && <Share/>}
   
   {Posts.map((p)=>(
     
   <Post key = {p._id} post = {p}/>
   
                   )
             )
   }
   
   
   

   
  </div>
 
 </div>
 
 </>
 )
}