import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { getlocalStorage, httpRequest } from '../../services/services';

function ModalC({ show, handleClose }) {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [tournamentData, setTournamentData] = useState({
    title: "",
    TournamentImage: null,
    streaming_link: "",
    streaming_date: "",
    streaming_time: "",
    created_by: "",
    userId: "",
    tournament_by: ""
  });
  const [JWTtoken, setToken] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const initialize = async () => {
      await getUser();
    };
    initialize();
  }, []);

  useEffect(() => {
    if (userDetails._id) {
      setTournamentData(prev => ({
        ...prev,
        created_by: userDetails.accountType,
        userId: userDetails._id,
        tournament_by: userDetails.name // Adjust as per the actual field in userDetails
      }));
    }
  }, [userDetails]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "TournamentImage" && files) {
      setTournamentData({
        ...tournamentData,
        [name]: files[0] // Handle file input
      });
    } else {
      setTournamentData({
        ...tournamentData,
        [name]: value
      });
    }
  }

  const getUser = async () => {
    try {
      const res = await getlocalStorage("user_details");
      const { token } = res;
      setToken(token);
      setUserId(res.user.others._id);
      setUserDetails(res.user.others);
    } catch (err) {
      console.error("Error getting user details:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    const formData = new FormData();
    for (const key in tournamentData) {
      formData.append(key, tournamentData[key]);
    }

    try {
      const headers = {
        "Authorization": "Bearer " + JWTtoken
      }
      const res = await httpRequest("POST", "api/tournament/create", formData, headers);
      // Handle the response as needed
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setSubmitLoading(false);
      handleClose();
    }
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h1>Header</h1>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control onChange={(e) => handleChange(e)} type="text" name="title" placeholder="Enter Title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Image</Form.Label>
              <Form.Control onChange={(e) => handleChange(e)} type="file" name="TournamentImage" placeholder="Enter Image" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Streaming Link</Form.Label>
              <Form.Control onChange={(e) => handleChange(e)} type="text" name="streaming_link" placeholder="Enter streaming link" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Streaming Date</Form.Label>
              <Form.Control onChange={(e) => handleChange(e)} type="text" name="streaming_date" placeholder="Enter streaming date" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Streaming Time</Form.Label>
              <Form.Control onChange={(e) => handleChange(e)} type="text" name="streaming_time" placeholder="Enter streaming time" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={(e) => handleChange(e)} type="password" name="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              {submitLoading ? "Loading..." : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalC;
