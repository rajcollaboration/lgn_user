import React, { useEffect, useState } from 'react';
import Sidebar from './SideBar';
import { Link } from 'react-router-dom';
import { getlocalStorage, httpRequest } from '../../services/services';
// const id = localStorage.getItem("user_details");
const Profile = () => {
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [streamerRequestLoading, setStreamerRequestLoading] = useState(false);
  const getUserDetails = async() => {
    getlocalStorage("user_details").then((res)=>{
      const {token, user} = res;
      setIsProfileLoading(true);
      const header2 = {
        "Authorization": "Bearer " + token
      };
    httpRequest("GET",`api/profile/user-profile/${user.others._id}`,{},header2).then((res) => {
      setProfileData(res.userdetails);
    }).catch((error)=>{
      console.log(error);
      
    }).finally (()=> {
      setIsProfileLoading(false);
    });
    })
  }
  
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.clear();
    window.location.reload();
  };
const requestForStreamer = async () => {
  setStreamerRequestLoading(true)
 const res = await httpRequest("POST","api/auth/streamer-request",{userId:profileData?._id});
 
 await getUserDetails();
 setStreamerRequestLoading(false);
}
  useEffect(()=>{
    getUserDetails();

  },[])

console.log(profileData);
  return (
    <div className='main-content'>
      <Sidebar handleLogout={handleLogout} />
      <div className="content_area">
        <div className="row">
          <div className="profile_area">
            <div className="row">
              <div className="col-sm-6 profile">
                <figure className="profile_image">
                  <img src="https://dev2024.co.in/web/lgn/assets/site/images/sticker.png" alt="Sticker" className="sticker" />
                  <img src="https://dev2024.co.in/web/lgn/assets/site/images/user_avatar.png" alt="User Avatar" />
                </figure>
                <figcaption>
                  <h4>{profileData?.name}</h4>
                  <Link to={"/edit"}>Edit Profile</Link> | <Link to={"/"} onClick={handleLogout}>Logout</Link>
                </figcaption>
              </div>
              <div className="col-sm-6">
                <button className='btn btn-warning' disabled={profileData?.accountType === "pending"} onClick={requestForStreamer}>{streamerRequestLoading ? "Loading..." : "Request For Streamer"}</button>
              </div>
            </div>
          </div>
        </div>
        <div className="basic_details">
          <div className="row">
            <div className="col-sm-3"><p>Age</p></div>
            <div className="col-sm-9"><p>{profileData?.age}</p></div>
          </div>
          <div className="row">
            <div className="col-sm-3"><p>Country</p></div>
            <div className="col-sm-9"><p>{profileData?.country}</p></div>
          </div>
          <div className="row">
            <div className="col-sm-3"><p>City</p></div>
            <div className="col-sm-9"><p>{profileData?.city}</p></div>
          </div>
          <div className="row">
            <div className="col-sm-3"><p>Stream Hour Watched</p></div>
            <div className="col-sm-9"><p>{profileData?.streaming_hour !== "" ? profileData?.streaming_hour : "Nothing to show"}</p></div>
          </div>
          <div className="row">
            <div className="col-sm-3"><p>Correct Prediction</p></div>
            <div className="col-sm-9"><p>7</p></div>
          </div>
          <div className="row">
            <div className="col-sm-3"><p>Prediction Ratio:</p></div>
            <div className="col-sm-9"><p>45%</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
