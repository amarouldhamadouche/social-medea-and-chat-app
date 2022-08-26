import Feed from '../../components/feed/feed'
import Rightbar from '../../components/rightbar/rightbar'
export default function ProfileBottom ({user,username,setUpdate}){
return<>
   <Feed username={username}/>
   <Rightbar user = {user}  setUpdate = {setUpdate} />  
  </>

}