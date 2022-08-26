import axios from 'axios'

export const loginCall =async (userCredential,dispatch)=>{
   dispatch({type:"LOGIN_START"})
   try{
    const resp = await axios.post("http://localhost:8800/api/auth/login",userCredential);
    dispatch({type:"LOGIN_SUCCESS", payload:resp.data})
   }catch(err){
    dispatch({type:"LOGIN_FAILURE"})
   }
} 

