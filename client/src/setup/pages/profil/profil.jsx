import Topbar from '../../components/topbar/topbar'
import Sidebar from '../../components/sidebar/sidebar'
import UpdateProfile from '../../components/updateProfile/updateProfile'
import ProfileBottom from './ProfileBottom'
import './profil.css'
import {useState,useEffect} from 'react' 
import axios from 'axios'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
export default function Profil(){
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [user,setUser] = useState({})
  const username = useParams().username
  
  
   
 const [update,setUpdate] = useState(false)

 useEffect(()=>{
   const fetchUser= async()=>{
     const resp = await axios.get(`http://localhost:8800/api/users/?username=${username}`)
     setUser(resp.data)
    
  }
  fetchUser()
},[username])



 return(
  <>
 <Topbar/>
 <div className="profile">
       <Sidebar/>
   <div className="profileRight">
    <div className="profileRightTop">
      <div className="profileImgCoverContainer">
       {user.coverImg?
       <img className="profileImgCover" src={PF + user.coverImg} alt=""/>
     :<div className='profileImgCover'></div>}  
        
         <img className="profileImg" src={` ${PF}${user.profileImg ||'noAvatar.png'}`} alt=""/>
      </div>
    <div className="profileUserInfo">
      <span className="profileUsername">{user.username}</span>
      <span className="profileDesc">{user.desc}</span>
    </div>
    </div>
    <div className="profileRightBottom">
    
      {!update
      ? <ProfileBottom user = {user} username = {username} setUpdate={setUpdate}/>
      
      :<UpdateProfile setUpdate = {setUpdate}  />
}
   

    </div>
    </div>
 </div> 
 </>
 )
}