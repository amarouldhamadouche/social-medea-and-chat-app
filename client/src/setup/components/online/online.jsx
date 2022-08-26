import './online.css'
export default function Online({user}){
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
 return(
  <>
   
   <li className="onlineFriend">
    <div className="profilImgContainer">
       <img className="onlineFriendImg" src = { PF + user.profilePicture} alt=""/>
     <span className="profileOnline"></span>
     </div>
     <span className="userName" style = {{color:'white'}}>{user.username}</span>
    
   </li>
 
  </>
 )
}