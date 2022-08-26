import './post.css'
import {useContext,useState,useEffect} from 'react'
import { MoreVert } from "@material-ui/icons";
import axios from 'axios'
import {AuthContext} from '../../contexs/AuthContex'
import { format } from "timeago.js";


import {Link} from  'react-router-dom'
export default function Post({post}){
     const {user:currentUser} = useContext(AuthContext)
     const [like,setLike] = useState(post.likes.length)
     const [isLiked,setIsLiked] = useState(false)
     const [user,setUser] = useState({})
     const PF = process.env.REACT_APP_PUBLIC_FOLDER
     useEffect(()=>{
          setLike(post.likes.length)
     },[post.likes]) 
    useEffect(()=>{
         setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id,post.likes])
     
     useEffect(()=>{
          const fetchUser = async()=>{
            const resp = await axios.get(`http://localhost:8800/api/users?id=${post.userId}`)
            setUser(resp.data)
           
        
          }
          fetchUser()
        },[post.userId])

     const likeHundler = ()=>{
           axios.put(`http://localhost:8800/api/post/${post._id}/like`,{userId:currentUser._id})
          setLike(isLiked ? 
               like - 1 :
               like + 1)
          setIsLiked(!isLiked)
     }

 return(
  <>
  <div className="postContainer">
       <div className="post">
   <div className="postWrapper">
    <div className="top">
     <div className="topLeft">
      <div className="userInfo"> 
      <Link to = {`profile/${user.username}`}>
      <img className="postIcon"
       src={user.profileImg 
          ?PF+ user.profileImg 
          :PF + 'noAvatar.png'} 
       alt=""/>
     </Link>
     <Link to = {`profile/${user.username}`} style = {{textDecoration:"none", color : "black"}}>
      <span className="userName" style = {{color:'white'}}>{user.username}</span>
      </Link>
      </div>
      <div className="timeCounter" style = {{color:'white'}}>{format(post.createdAt)}</div>
     </div>
     <div className="topRight">
      <MoreVert className="moreVert" style = {{color:'white'}}/>
     </div>
    </div>
    <div className="center">
     <p className="desc" style = {{color:'white'}}>{post?.desc}</p>
     <img className="publicationImg" src={post.img ? PF + post.img :''}  alt=""/>
    </div>
    <div className="bottom">
     <div className="bottomLeft">
    <img className="likeIcon" src={`${PF}like.png`}  onClick={likeHundler} alt=""/>
    <img className="likeIcon" src={`${PF}heart.png`}  onClick={likeHundler} alt=""/>
    <span className="likeCounter" style = {{color:'white'}}>
     {like} people like it
    </span>
     </div>
    
    </div>
   </div>
  </div>
  </div>
  
  </>
 )
}