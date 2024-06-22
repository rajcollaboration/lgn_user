import React, { useEffect, useState, useRef } from "react";
import { getlocalStorage, httpRequest } from "../../services/services";
import Diamond from "../../images/user_avatar.png";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import io from 'socket.io-client';

const RightBar = ({ tournamentData,userData,chat,setChat }) => {
  // const [chat, setChat] = useState([]);
  const { id } = useParams();
  const [chatData, setChatData] = useState({
    tournamentId: id,
    author: "",
    content: "",
  });
  const [sendChatLoading, setSendChatLoading] = useState(false);
  const socketRef = useRef(null);
  // useEffect(() => {
  //   socketRef.current = io('http://localhost:8080', { query: { tournamentId: tournamentData._id } });
    
  //   socketRef.current.on('newComment', (comment) => {
  //       setChat((prevComments) => [...prevComments, comment]);
  //   });

  //   return () => {
  //     socketRef.current.disconnect();
  //   };
  // }, [tournamentData._id]);

  const handleUserMessage = (event) => {
    setChatData((prev) => ({
      ...prev,
      content: event.target.value,
    }));
  };

  const sendChat = async () => {
    setSendChatLoading(true);
    const res = await getlocalStorage("user_details");
    try {
      const { token } = res;
      const header2 = {
        "Authorization": "Bearer " + token
      };
  
      // Create a local copy of chatData and update the author field
      const updatedChatData = {
        ...chatData,
        author: res.user.others._id,
      };
  
      // Use the updatedChatData directly in the HTTP request
      await httpRequest("POST", "api/tournament/add/comment", updatedChatData, header2);
      
      // Clear the chat content after sending the message
      setChatData((prev) => ({
        ...prev,
        content: "",
      }));
  
      // Optionally update the chat with the new comment
      // setChat((prevComments) => [...prevComments, updatedChatData]);
      // await getAllChat();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setSendChatLoading(false);
    }
  };
  

  const getAllChat = async () => {
    const res = await getlocalStorage("user_details");
    try {
      
      const { token } = res;
      const header2 = {
        Authorization: "Bearer " + token,
      };
      const response = await httpRequest(
        "GET",
        `api/tournament/get/tournament-comments/${id}`,
        {},
        header2
      );
      setChat(response);  
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllChat();
  }, [id]);

  return (
    <div className="right_sidebar order-sm-3 active">
      <div className="stream_info">
        <div className="stream_meta">
          <figure>
            <img src={Diamond} alt="Streamer Avatar" />
          </figure>
          <figcaption>
            <h4>{tournamentData?.tournament_by}</h4>
            <h5>{userData?.followerCount} Followers</h5>
          </figcaption>
        </div>
        <h4>Stream Title</h4>
        <p>{tournamentData?.title}</p>
        <a href="#" className="hashtag">
          #Hashtags
        </a>
        <a href="#" className="hashtag">
          #Hashtags
        </a>
      </div>
      <h4 className="sidebar_heading stream_head">
        Stream Chat
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.03125 5.46875C4.45312 5.46875 2.34375 7.57812 2.34375 10.1562C2.34375 11.7063 3.10703 13.0859 4.27266 13.9406C2.2125 14.9625 0.78125 17.0813 0.78125 19.5312H2.34375C2.34375 16.9344 4.43438 14.8438 7.03125 14.8438C9.62813 14.8438 11.7188 16.9344 11.7188 19.5312H13.2812C13.2812 16.9344 15.3719 14.8438 17.9688 14.8438C20.5656 14.8438 22.6562 16.9344 22.6562 19.5312H24.2188C24.2188 17.0805 22.7875 14.9625 20.7273 13.9406C21.3238 13.506 21.8094 12.9368 22.1445 12.2792C22.4797 11.6216 22.655 10.8943 22.6562 10.1562C22.6562 7.57812 20.5469 5.46875 17.9688 5.46875C15.3906 5.46875 13.2812 7.57812 13.2812 10.1562C13.2812 11.7063 14.0445 13.0859 15.2102 13.9406C14.0687 14.5018 13.1239 15.3955 12.5 16.5039C11.8761 15.3955 10.9313 14.5018 9.78984 13.9406C10.3863 13.506 10.8719 12.9368 11.207 12.2792C11.5422 11.6216 11.7175 10.8943 11.7188 10.1562C11.7188 7.57812 9.60938 5.46875 7.03125 5.46875ZM7.03125 7.03125C8.76797 7.03125 10.1562 8.41953 10.1562 10.1562C10.1562 11.893 8.76797 13.2812 7.03125 13.2812C5.29453 13.2812 3.90625 11.893 3.90625 10.1562C3.90625 8.41953 5.29453 7.03125 7.03125 7.03125ZM17.9688 7.03125C19.7055 7.03125 21.0938 8.41953 21.0938 10.1562C21.0938 11.893 19.7055 13.2812 17.9688 13.2812C16.232 13.2812 14.8438 11.893 14.8438 10.1562C14.8438 8.41953 16.232 7.03125 17.9688 7.03125Z"
            fill="white"
          />
        </svg>
      </h4>
      <div className="chat_area" id="chat_div">
        {chat?.map((chatItem, index) => (
          <div key={index} className="chat_item">
            <div className="chaticon">
              <img src={Diamond} alt="user-profile"/>
            </div>
            <div className="chattext">
              <b>{chatItem.userName}</b> {chatItem.content}
            </div>
          </div>
        ))}
      </div>
      <div className="chat_footer">
        <div className="chat_wrapper">
          <div className="emoji">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-smile"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
          </div>
          <textarea
            placeholder="Send a message"
            rows="1"
            id="txt_message"
            value={chatData.content}
            onChange={handleUserMessage}
            
          ></textarea>
          <div className="chatsend" onClick={sendChat} disabled = {chatData.content.length === 0}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-send"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
