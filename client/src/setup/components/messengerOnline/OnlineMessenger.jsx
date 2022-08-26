import "./onlineMessenger.css";
import { useState, useEffect } from "react";
import axios from "axios";
export default function OnlineMessenger({ friendId }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friend, setFriend] = useState({});
  useEffect(() => {
    const fetchfriend = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:8800/api/users/?id=" + friendId
        );
        setFriend(resp.data);
      } catch (err) {}
    };
    fetchfriend();
  }, [friendId]);

  return (
    <>
      <div className="onlineMessenger">
        <div className="onlineMessengerWrapper">
          <div className="onLineConversation">
            {console.log(friend)}
            <img
              className="onlineMessengerProfilePicture"
              src={
                friend.profileImg ? PF + friend.profileImg : PF + "noAvatar.png"
              }
              alt=""
            />
            <div className="greenPoint"></div>
          </div>
          <span className="onlineMessengerUsername">{friend?.username}</span>
        </div>
      </div>
    </>
  );
}
