import "./messenger.css";
import Topbar from "../../components/topbar/topbar";
import Conversation from "../../components/conversation/conversation";
import Message from "../../components/message/Message";
import OnlineMessenger from "../../components/messengerOnline/OnlineMessenger";
import { AuthContext } from "../../contexs/AuthContex";
import { useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

export default function Messenger() {
  const [conversations, setConversation] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [message, setMessage] = useState([]);
  const [arrivalMessage, setarrivalMessage] = useState(null);
  const { user } = useContext(AuthContext);
  const text = useRef();
  const scrolRef = useRef();
  const socket = useRef();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [onlineFriend, setOnlineFriend] = useState(null);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setarrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentConversation?.members.includes(arrivalMessage.sender) &&
      setMessage((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentConversation]);
  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);
  useEffect(() => {
    let of = [];
    onlineUsers.map(
      (ou) =>
        user.followings.includes(ou.userId) && of.push({ friendId: ou.userId })
    );
    of.length > 0 && setOnlineFriend(of);
  }, [onlineUsers, user]);
  const handlerClick = async (e) => {
    e.preventDefault();
    const newMessage = {
      conversationId: currentConversation._id,
      sender: user._id,
      text: text.current.value,
    };
    text.current.value = "";
    const receiverId = currentConversation.members.find((m) => m !== user._id);
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage.text,
    });
    try {
      const resp = await axios.post(
        "http://localhost:8800/api/message/",
        newMessage
      );
      setMessage([...message, resp.data]);
    } catch (err) {}
  };
  useEffect(() => {
    const getMessages = async () => {
      if (currentConversation) {
        try {
          const resp = await axios.get(
            "http://localhost:8800/api/message/" + currentConversation._id
          );
          setMessage(resp.data);
        } catch (err) {}
      }
    };
    getMessages();
  }, [currentConversation]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:8800/api/conversation/" + user._id
        );
        setConversation(resp.data);
      } catch (err) {}
    };
    getConversations();
  }, [user]);

  useEffect(() => {
    scrolRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="messengerLeft">
          <div className="messengerLeftWrapper">
            <div className="messengerLeftInputContainer">
              <input
                placeholder="search for conversation"
                type="text"
                className="messengerLeftInput"
              />
            </div>

            {conversations.map((c) => (
              <div
                key={c._id}
                style={{ cursor: "pointer" }}
                onClick={() => setCurrentConversation(c)}
              >
                <Conversation conversation={c} user={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="messengerCenter">
          <div className="messengerCenterWrapper">
            {currentConversation ? (
              <>
                <div className="messengerMessageTop">
                  {message.map((m) => (
                    <div ref={scrolRef}>
                      <Message
                        key={m?._id}
                        user={user}
                        conversation={currentConversation}
                        text={m?.text}
                        timeago={m?.createdAt}
                        own={m?.sender === user._id}
                      />
                    </div>
                  ))}
                </div>
                <form className="messageBottom" onSubmit={handlerClick}>
                  <input
                    type="text"
                    placeholder="send a message"
                    ref={text}
                    required
                    className="messageBottomInput"
                  />
                  <button className="messageBottomButton" type="submit">
                    {" "}
                    Send{" "}
                  </button>
                </form>
              </>
            ) : (
              <span className="noCheckBox">open Conversation</span>
            )}
          </div>
        </div>
        <div className="messengerRight">
          {onlineFriend ? (
            <>
              {console.log(onlineFriend)}{" "}
              <div className="messengerRightWrapper">
                {onlineFriend.map((of) => (
                  <OnlineMessenger friendId={of.friendId} />
                ))}
              </div>{" "}
            </>
          ) : (
            <span>no friend are online</span>
          )}
        </div>
      </div>
    </>
  );
}
