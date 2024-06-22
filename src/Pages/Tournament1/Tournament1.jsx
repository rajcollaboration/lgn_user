import React, { useEffect, useRef, useState } from 'react';
import LeftBar from './LeftBar';
import MidBar from './MidBar';
import RightBar from './RightBar';
import { useParams } from 'react-router-dom';
import { getlocalStorage, httpRequest } from '../../services/services';
import io from 'socket.io-client';
const Tournament1 = () => {
  const [tournamentData, setTournamentData] = useState({});
  const [userData, setUserData] = useState({});
  const {id} = useParams();

  // Start Socket for tournament

  const [chat, setChat] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0); // State to hold the total users count
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = io('https://lgn-backend-ypss.onrender.com', { query: { tournamentId: tournamentData._id } });
        
        // Event listener for new comments
        socketRef.current.on('newComment', (comment) => {
            setChat(prevComments => [...prevComments, comment]);
        });

        // Event listener for total users count
        socketRef.current.on('totalUsers', (count) => {
            setTotalUsers(count);
            console.log(count);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [tournamentData._id]);
const tournamentDetails = () =>{
  getlocalStorage('user_details').then((res)=>{
    console.log(res.token);
    const {token} = res;
    const header2 = {
        "Authorization": "Bearer " + token
      }
httpRequest("GET", `api/tournament/get-tournament-details/${id}`,{},header2)
.then((res) => {
  console.log(res);
  setTournamentData(res.tournament);
  setUserData(res.userdetails);
})
.catch((error) => {
  console.log(error);
});
})
}
  useEffect(()=>{
    tournamentDetails();
    
  },[]);
    return (
        <content>
          <LeftBar />
          <MidBar tournamentData={tournamentData} totalUsers={totalUsers} userData={userData} tournamentDetails={tournamentDetails}/>
          <RightBar tournamentData={tournamentData} userData={userData} chat={chat}  setChat={setChat} />
        </content>
      );
    };

export default Tournament1