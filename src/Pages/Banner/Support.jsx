import React, { useState } from "react";
import Sidebar from "./SideBar";
import { httpRequest } from "../../services/services";
const useDetails = JSON.parse(localStorage.getItem("user_details"));
const Support = () => {
  const [supportDetails, setSupportDetails] = useState({
    name: useDetails.name,
    email: useDetails.email,
    subject: "",
    message: "",
  });
  const handleSubmit = (event) => {
    // Handle form submission
    event.preventDefault();
    httpRequest("POST","api/support-tickit/create",supportDetails).then((res)=>{
      console.log(res);
      alert("Ticket created successfully");
    })
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setSupportDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }

  return (
    <div className="main-content">
      <Sidebar />
      <div className="content_area">
        <div className="row">
          <div className="profile_area">
            <h4>Contact Support</h4>
            <form
              onSubmit={handleSubmit}
              action="https://dev2024.co.in/web/lgn/site/pages/support_submit"
              method="post"
            >
              <div className="form-group mb-3">
                <label className="control-label">Your Name</label>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  required
                  value={supportDetails?.name}
                  onChange={(e)=>handleInput(e)}
                />
              </div>
              <div className="form-group mb-3">
                <label className="control-label">Your Email Id</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  required
                  value={supportDetails?.email}
                  onChange={(e)=>handleInput(e)}
                />
              </div>
              <div className="form-group mb-3">
                <label className="control-label">Subject</label>
                <input
                  name="subject"
                  type="text"
                  className="form-control"
                  value={supportDetails?.subject}
                  onChange={(e)=>handleInput(e)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label className="control-label">Message</label>
                <textarea
                  className="form-control"
                  name="message"
                  value={supportDetails?.message}
                  onChange={(e)=>handleInput(e)}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <input
                  type="submit"
                  value="Submit"
                  className="submit_btn"
                  style={{ width: "200px" }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
