import './rightbar.css'
import {Users} from '../../dummyData'
import Online from '../online/online.jsx'
import {useState,useContext,useEffect} from 'react'
import { AuthContext } from '../../contexs/AuthContex'
import axios from 'axios'
import { Add, Remove } from "@material-ui/icons";
import { FriendList } from './friendList'
export default function Rightbar ({user,update,setUpdate}){
    
    const {user:currentUser,dispatch} = useContext(AuthContext)
    const [Followed,setFollowed] = useState(currentUser.followings.includes(user?._id))
    const [friend,setFriend] = useState([])
    useEffect(()=>{
      setFollowed(currentUser.followings.includes(user?._id))
    },[user,currentUser])
    useEffect(()=>{
      const fetchFriends = async()=>{
        try{
        if(user){  
        const friendList = await axios.get('http://localhost:8800/api/users/friend/' + user?._id)
        setFriend(friendList.data)}
      }catch(err){
        console.log(err)
      }
      }
      fetchFriends()
    },[user])
    const followHandler = async()=>{
      try{
          if(Followed){
           await axios.put('http://localhost:8800/api/users/' + user._id + '/unFollow',{userId:currentUser._id})
           dispatch({type:'unFollow',payload:user._id})}
           else{ await axios.put('http://localhost:8800/api/users/' + user._id + '/follow',{userId:currentUser._id})
           dispatch({type:'Follow',payload:user._id})}    
           setFollowed(!Followed)
        }catch(err){
          console.log(err)
        }}
       
    
  const RightbarProfile = ()=>{
    return (
      <>
      {user.username!==currentUser.username
      ? <button className="rightbarProfileButton"
       onClick={followHandler}>
        {Followed ? 'unFollow' : 'Follow'}
        { Followed ? <Remove/> : <Add/> }
        </button>
        :<button className="rightbarProfileButton1"
         onClick={()=>setUpdate(true)}>
         modifier votre profile
         </button>}
      <h4 className="titlebar">
        User Info:
      </h4>
      <div className='rightbarUserInfoContainer'>
      <div className="rightbarUserInfo">
        <div className="rightbarUserInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{user.city}</span>
        </div>
        <div className="rightbarUserInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">{user.from}</span>
        </div>
        <div className="rightbarUserInfoItem">
          <span className="rightbarInfoKey">RelationShip:</span>
          <span className="rightbarInfoValue">{user.relationship===1
                                              ?"Single"
                                              :user.relationship===1
                                              ?"married"
                                              :'_'}</span>
        </div>
      </div>
      </div>
      <h4 className="titlebar">User Friends:</h4>
      <div className='rightbarFollowingscnt'>
      <div className='rightbarFollowingsContainer'>
      <div className="rightbarFollowings">
        {friend.map((frnd) =>(  
          <FriendList key = {frnd._id} frnd = {frnd}/> 
          )
        )
  }
      </div>
      </div>
      </div>
 
      </>
    )

  }
  const RightbarHome = ()=>{
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return(
      <>
    <div className="birthdayContainer">
    <img className="birthdayImg" src="./assets/gift.png" alt=""/>
    <span className="birthdayText">
    <b className='b'>samir ouldh</b> and <b className='b'>3 other </b> have a birthday
    </span>
   </div>
   <div className="rightbarAd">
 <img className="adImg" src={`${PF}ad.png`} alt=""/>
   </div>
   <h4 className="onlineFriends" style={{color:'white'}}>online friends</h4>
   
   <ul className="friendList">
   <div className='friendListContainer'>
     <div className = 'friendlst'>
     {Users.map(u=>{
       return <Online key={u.id} user={u}/>
     })}
     </div>
     </div>
     </ul>

     
     </>
    )
  }
 return( <>
 <div className= 'rightbar'>
 <div className="rightbarWrapper">
{user ?  <RightbarProfile/> : <RightbarHome/>}
   
  </div> 
  </div>
  </>)}