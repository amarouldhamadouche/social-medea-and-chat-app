import React from 'react'
import './update.css'
import {AuthContext} from '../../contexs/AuthContex'
import { useContext,useState,useRef} from 'react'
import axios from 'axios'



export default function Update({setUpdate}) {
 const {user,dispatch } =  useContext(AuthContext)
 const [changePassword,setChangePassword] = useState(false)
 const [profilePicture,setprofilePicture] = useState(null)
 const [coverPicture,setCoverPicture] = useState(null)
 const username = useRef()
 const desc = useRef()
 const newPassword = useRef()
 const currentPassword = useRef()
 const relationship = useRef()
 const city = useRef()
 const from = useRef()



 const updateHandler= async(e)=>{
  e.preventDefault()
  const updatedUser = {
   userId:user._id,
   username:username.current.value,
   desc:desc.current.value ,
   from:from.current.value,
   city:city.current.value,
   relationship:relationship.current.value,
   profileImg : user.profileImg,
   coverImg : user.coverImg
   
  }
  
  if(profilePicture){
      
    const data = await new FormData()
    const profileImgName = Date.now() + profilePicture.name
    data.append("name",profileImgName)
    data.append("file",profilePicture)
    updatedUser.profileImg = profileImgName
  
    try{
      
      await axios.post('http://localhost:8800/api/upload',data)
    }catch(err){}
  }
  if(coverPicture){
      
    const data = await new FormData()
    const coverImgName = Date.now() + coverPicture.name
    data.append("name",coverImgName)
    data.append("file",coverPicture)
    updatedUser.coverImg = coverImgName
  
    try{
      
      await axios.post('http://localhost:8800/api/upload',data)
    }catch(err){}
  }
  try{
  await axios.put('http://localhost:8800/api/users/'+ user._id,updatedUser)
  
   dispatch({type:'update',payload:updatedUser})
   
   window.location.pathname = '/profile/' + username.current.value
   setUpdate(false)
  }catch(err){}
}
const changePasswordHandler =async (e)=>{
  e.preventDefault()
  const passwords = {
    userId:user._id,
    currentPassword:currentPassword.current.value,
    password :newPassword.current.value
  }
  try{
   await axios.put('http://localhost:8800/api/users/' + user._id,passwords)
   setUpdate(false)
   window.location.reload();
  }catch(err){}
  
}
const InfoUpdate = () => {
 return (
  <>
  <div className="updateProfile">
   <div className = 'updateWrapper'>
   <div className='UPTitlediv'>
    <span className='UPTitleSpan' style = {{color:'white'}}>
      Update Ur Profile : 
    </span>
   </div>
   <form className = 'updateBorder' onSubmit={updateHandler}>  
   <div className = 'updateContainer'>
    <div className="UPCtop">
    <label className='UCPlabel'>
    <span className = 'UCPspan'
    style = {{color:'white'}}>add a profile picture</span>
    <input type="file"
      name = "file"
      style = {{display:"none"}}
      accept=".png,.jpeg,.jpg"
      onChange={(e)=>setprofilePicture(e.target.files[0])} />
    </label>
  
    <label className='UCPlabel'>
    <span className = 'UCPspan' style = {{color:'white'}}>add a cover picture</span>
    <input type="file"
   name = "file"
   style = {{display:"none"}}
    accept=".png,.jpeg,.jpg"
    onChange={(e)=>setCoverPicture(e.target.files[0])} />
    </label>
   
    </div>
    <hr className='UPHR'/>
   <div className="updateKey">
    <label className='updateLabel'> username : </label>
    
    <input className = "updateInput"
    required
    minLength = '4'
     defaultValue={user.username}
     type='text'
     ref = {username}/>
    
   </div>
   <div className="updateKey">
    <label className='updateLabel'> desc : </label>
    
    <input className = "updateInput" ref = {desc} defaultValue={user?.desc }  type='text'/>
  
   </div>
   <div className="updateKey">
    <label className='updateLabel'> from : </label>
    
    <input className = "updateInput" ref = {from} defaultValue={user?.from} type='text'/>
    
   </div>
   <div className="updateKey">
    <label className='updateLabel'> city : </label>
    
    <input className = "updateInput" ref = {city} defaultValue={user?.city} type='text'/>

   </div>
   <div className="updateKey">
    <label className='updateLabel'> relationship : </label>
  
    <input className = "updateInput"  ref = {relationship} defaultValue={user?.relationship} type='text'/>

   </div>
   <hr className='UPHR'/>
   <span
    style={{color:'white', marginLeft:'80px', textDecoration:'underLine', cursor:'pointer'}} onClick={()=>setChangePassword(true)}>
    Change Your Password</span>
  </div>
 
  <button className = 'upButton' type = 'submit'>Update</button>
  
  <button className='cancelButton' type = 'button' onClick={()=>setUpdate(false)}>Cancel</button>
  </form>
  </div>
  </div>

  </>
 )}
 const ChangePassword = () => {
   return(
     <>
       <div className="updateProfile">
   <div className = 'updateWrapper'>
   <div className='UPTitlediv'>
    <span className='UPTitleSpan' style = {{color:'white'}}>
      Change Ur Password : 
    </span>
   </div>
   <form className = 'updateBorder' onSubmit={changePasswordHandler}> 
   <div className = 'updateContainer'>
   <div className="updateKey">
    <label className='updateLabel'> currentPassword: </label>
    
    <input className = "updateInput" ref = {currentPassword} required   type='password'/>

   </div>
   <div className="updateKey">
    <label className='updateLabel'> new password : </label>
    
    <input className = "updateInput" ref = {newPassword} required type='password'/>

   </div>
   </div>
   <button className = 'changeButton' type = 'submit'>Change</button>
   </form>
   </div>
   </div>
     </>
   )
 }
 return (
   <>
   {
    changePassword ? <ChangePassword/> : <InfoUpdate/>
}
</>
 )
}