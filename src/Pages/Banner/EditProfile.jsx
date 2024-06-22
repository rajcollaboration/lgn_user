import React, { useEffect, useState } from 'react';
import Sidebar from './SideBar';
import { getlocalStorage, httpRequest } from '../../services/services';

const EditProfile = () => {
  const [profileDetails, setProfileDetails] = useState({
    name:"",
    mobile:"",
    age:"",
    gender:"",
    country:"",
    city:""
  });
const [userId, setUserId] = useState("");
const [token, setToken] = useState("");
  const updateProfile = (e) => {
    const {name,value} = e.target;
    console.log(name,value);
    setProfileDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const getUserDetails = async() => {
    getlocalStorage("user_details").then((res)=>{
      const {token, user} = res;
      setUserId(user.others._id);
      setToken(token);
      const header2 = {
        "Authorization": "Bearer " + token
      };
    httpRequest("GET",`api/profile/user-profile/${user?.others?._id}`,{},header2).then((res) => {
      console.log(res);
      setProfileDetails({
        name: res.userdetails.name,
        mobile: res.userdetails.mobile,
        age: res.userdetails.age,
        gender: res.userdetails.gender,
        country: res.userdetails.country,
        city: res.userdetails.city
      })
    }).catch((error)=>{
      console.log(error);
      
    }).finally (()=> {
     
    });
    })
  }

  const submitUpdateProfile = (e) => {
    e.preventDefault();
    if(profileDetails?.name === "" || profileDetails?.mobile === ""){
      alert("Please provide Name and Mobile");
      return;
    }
    console.log(profileDetails);
    httpRequest("PUT","api/profile/edit-profile",{...profileDetails,userId,token}).then((res)=>{
      alert("Profile updated");
    }).catch((err)=>{
      console.log(err);
    });
  }
  useEffect(()=>{
    getUserDetails();
  },[])
  return (
    <content>
      <div className='relative left_side'>
        <Sidebar/>
        </div>
      <div className="stream_area">
        <div className="row">
          <div className="profile_area">
            <h4>Contact Support</h4>
            <form action="" method="">
              <div className="form-group mb-3">
                <label className="control-label">Your Name</label>
                <input name="name" value={profileDetails.name} onChange={(e)=>updateProfile(e)} type="text" className="form-control" required="required"  />
              </div>
              <div className="form-group mb-3">
                <label className="control-label">Your Mobile No</label>
                <input name="mobile" value={profileDetails?.mobile} onChange={(e)=>updateProfile(e)} type="text" className="form-control" required="required"  />
              </div>
              <div className="form-group mb-3">
                <label className="control-label">Your Age</label>
                <input name="age" value={profileDetails?.age} onChange={(e)=>updateProfile(e)} type="text" className="form-control" />
              </div>
              <div className="form-group mb-3">
                <label className="control-label">Your Gender</label>
                <select name="gender" defaultChecked={profileDetails?.gender} onChange={(e)=>updateProfile(e)} className="form-control">
                  <option value="">Select Gender</option>
                  <option value="male" selected>Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group mb-3">
                <label className="control-label">Your Country</label>
                <input name="country" value={profileDetails?.country} onChange={(e)=>updateProfile(e)} type="text" className="form-control"  />
              </div>
              <div className="form-group mb-3">
                <label className="control-label">Your City</label>
                <input name="city" value={profileDetails?.city} onChange={(e)=>updateProfile(e)} type="text" className="form-control"  />
              </div>
              <div className="form-group">
                <input type="submit" onClick={(e)=>submitUpdateProfile(e)} value="Submit" className="submit_btn" style={{ width: '200px' }} />
              </div>
            </form>
          </div>
        </div>
      </div>
    
    </content>
  );
};

export default EditProfile;
