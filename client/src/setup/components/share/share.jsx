import './share.css'
import {
 PermMedia,
 Label,
 Room,
 EmojiEmotions,
  Cancel
} from "@material-ui/icons";
import {useContext,useState,useRef} from 'react'
import { AuthContext } from '../../contexs/AuthContex';
import axios from 'axios'

export default function Share() {

  const {user} = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [file,setFile] = useState(null)
  const desc = useRef()

  const submitHandler = async(e)=>{
    e.preventDefault()
    const newPost = {
      userId:user._id,
      desc:desc.current.value
    }
    if(file){
      
      const data = await new FormData()
      const filename = Date.now() + file.name
      data.append("name",filename)
      data.append("file",file)
      newPost.img = filename
      try{
        
        await axios.post('http://localhost:8800/api/upload',data)
      }catch(err){}
    }
    try{
    console.log(newPost)
    await axios.post('http://localhost:8800/api/post/',newPost)
    window.location.reload();
  }catch(err){}}
 return (
  <>
  <div className='shareContainer'>
  <div className="share">
   <div className="shareWrapper" >
    <div className="shareTop">
     <img className="shareProfileImg" src={user.profileImg?
      PF +  user.profileImg
      :PF + 'noAvatar.png'} alt=""/>
     <input placeholder={"what's in ur mind " + user.username}
      className="shareInpt" ref={desc}/>
   </div>
   <hr className='shareHr'/>
   {file&&(
   <div className = 'shareImgContainer'>
     <img className='shareImg' src={URL.createObjectURL(file)} alt=""/>
     <Cancel className = 'shareCancelImg' onClick = { ()=>setFile(null) }/>
   </div>
   )}
<form className="shareBottom" onSubmit={submitHandler} >
 <div className="shareOptions">
  <label className="shareOption">
   <PermMedia htmlColor="tomato" className="shareIcon"/>
   <input type="file"
   name = "file "
   style = {{display:"none"}}
    accept=".png,.jpeg,.jpg"
    onChange={(e)=>setFile(e.target.files[0])} />
   <span  className="shareOptionText">photo or video</span>
  </label>
  <div className="shareOption">
   <Label htmlColor="blue" className="shareIcon"/>
   <span  className="shareOptionText">Tag</span>
  </div>
  <div className="shareOption">
   <Room htmlColor="green" className="shareIcon"/>
   <span  className="shareOptionText">Location</span>
  </div>
  <div className="shareOption">
   <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
   <span  className="shareOptionText">Feelings</span>
  </div>
  </div>
 <button className="shareButton" type="submit" >
   Share
   </button>
 </form> 
   </div>
  </div>
  </div>
  </>
 )
}
