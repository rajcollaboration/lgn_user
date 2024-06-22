import React, { useEffect, useState } from 'react';
import Sidebar from './SideBar';
import { httpRequest } from '../../services/services';

const Notification = () => {
    const [notificationLoading, setNotificationLoading] = useState(false);
    const [notificationData, setNotificationData] = useState([]);
    const getAllNotification = () => {
        httpRequest("GET", "/notification").then((response) => {
            setNotificationLoading(true);
            console.log(response);
            setNotificationData(response.notifications);
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
