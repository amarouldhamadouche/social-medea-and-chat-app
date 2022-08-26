import '../Login/Login.css'
import './register.css'
import axios from 'axios'
import {useRef} from 'react'
import {useHistory} from 'react-router'
import {Link} from 'react-router-dom'

export default function Register() {
 
  
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const passwordAgain = useRef()
  const history = useHistory()
  
  const clickHundler=async(e)=>{
    e.preventDefault()
    
    if (passwordAgain.value!==password.value){
     passwordAgain.setCustomValidity("password don't match!")
    }else{
      const user = {
        username:username.current.value,
        email:email.current.value,
        password:password.current.value
      }
      try{
       await axios.post("http://localhost:8800/api/auth/register/",user)
       history.push("/login")
      }catch(err){
        console.log(err)
      }
    }
    
  }
 return (
 <>
 <div className="login">
     <div className="loginWrapper">
      
       <div className="loginLeft">
      
        <h1 className="loginLogo">Login into amarSocial</h1>
  
        </div>
        <div className="loginRight">
          <div className="loginBoxContainer">   
           <form className="loginBox" onSubmit={clickHundler}>
             <div className="inptContainer">
                   <input placeholder="enter ur username"
                    required
                    ref={username}
                    className="loginInpt" />
                 </div>
                 <div className="inptContainer">
                   <input placeholder="enter ur email"
                    type="email"
                    required
                    ref={email}
                     className="loginInpt" />
                 </div>
                 <div className="inptContainer">
                   <input placeholder="enter ur password"
                    type="password" 
                    required
                    name='password'
                    ref = {password}
                    
                    
                    className="loginInpt"/>
                </div>
                <div className="inptContainer">
                   <input  placeholder="enter ur password again"
                    type="password"
                    required
                    name='passwordAgain'
                    
                    ref = {passwordAgain}
                    
                    className="loginInpt"/>
                </div>
               <button className="loginBtn" type="submit"  >Sign Up</button>
              
             </form>
             </div>
            <div className="loginBtnDiv">
            <Link to = '/login' style = {{textDecoration:'none'}}>
              
             
             <button className="loginBtn1" type="button"  >Login</button>
              
             </Link>
            
             </div>
          </div>
         
     </div>
      
 
  </div>

 </>
 )
}
