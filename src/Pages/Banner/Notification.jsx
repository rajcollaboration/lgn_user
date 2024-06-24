import React, { useEffect, useState } from 'react';
import Sidebar from './SideBar';
import { getlocalStorage, httpRequest } from '../../services/services';

const Notification = () => {
    const [notificationLoading, setNotificationLoading] = useState(false);
    const [notificationData, setNotificationData] = useState([]);
    const [JWTtoken, setToken] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const initialize = async () => {
          await getUser();
        };
        initialize();
      }, []);

      const getUser = async () => {
        try {
          const res = await getlocalStorage("user_details");
          const {token} = res;
          setToken(token);
          setUserId(res.user.others._id);
        } catch (err) {
          console.error("Error getting user details:", err);
        }
      };
    const getAllNotification = () => {
        const header2 = {
            "Authorization": "Bearer " + JWTtoken
          }
        httpRequest("GET", `api/profile/notification/${userId}`,{},header2 ).then((response) => {
            setNotificationLoading(true);
            setNotificationData(response.allNotificationByUserId);
        }).catch((error)=> {
            console.log(error);
        }).finally(()=> {
            setNotificationLoading(false);
        });
    }

    useEffect (()=> {
        getAllNotification();
    },[]);
  return (
    <div className='main-content'>
      <Sidebar/>
      <div className="content_area">
            <div className="row">
                <div className="profile_area">
                    <h4>Notifications</h4>
                    {
                        notificationData?.map((notification) => (
                            <div className="notification_item">
                        <figure>
                            <img src={notification.image} alt="Notification Logo" />
                        </figure>
                        <figcaption>
                            <h5>{notification.title}</h5>
                            <p>
                                {notification.description}
                            </p>
                        </figcaption>
                    </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
  );
};

export default Notification;
