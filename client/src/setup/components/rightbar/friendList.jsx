import './rightbar.css'
import {Link} from 'react-router-dom'

export const FriendList = ({frnd})=>{
 const PF = process.env.REACT_APP_PUBLIC_FOLDER
return <>
<Link to ={ `/profile/${frnd.username}`} style = {{textDecoration:"none"  }}>
<div className="rightbarFollowing">
          <img src={frnd.profileImg
          ?PF + frnd.profileImg
          :PF + 'noAvatar.png'} 
          alt = '' className="friendImg"/>
          <span className="friendName">{frnd.username}</span>
        </div>
        </Link>
</>
}
