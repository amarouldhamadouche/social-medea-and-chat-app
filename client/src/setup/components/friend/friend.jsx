import './friend.css'

export default function Friend({user}){
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
return(
 <>
  <li className="friendListItems">
   <img className="img" src={PF + user.profilePicture} alt=""/>
   <span className="username">{user.username}</span>
 </li>
 
 </>
)

}