import React, { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import { getlocalStorage, httpRequest } from "../../services/services";

const Predictions = () => {
  const [prediction, setPrediction] = useState([]);
  const [isLoadingPrediction, setIsloadingPrediction] = useState(false);
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
      setUserId(res.user.others._id);
    } catch (err) {
      console.error("Error getting user details:", err);
    }
  };

  useEffect(() => {
    if (userId) {
      getPrediction();
    }
  }, [userId]);

  const getPrediction = () => {
    console.log(userId, "userId");
    setIsloadingPrediction(true);
    httpRequest("GET", `api/tournament/prediction-list/${userId}`)
      .then((res) => {
        console.log(res);
        setPrediction(res.result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsloadingPrediction(false);
      });
  };

  return (
    <div className="main-content">
      <Sidebar />
      <div className="content_area">
        <div className="row">
          <div className="profile_area">
            <h4>My Predictions</h4>
            <div className="leader_board">
              <table className="table">
                <thead>
                  <tr>
                    <th align="center">#</th>
                    <th>Tournament</th>
                    <th>Question</th>
                    <th>Your Answer</th>
                    <th align="center">Duration from Question</th>
                  </tr>
                </thead>
                <tbody>
                  {prediction?.map((pred, key) => (
                    <tr key={key}>
                      <td align="center">{key + 1 + "."}</td>
                      <td>{pred.tournament.title}</td>
                      <td>{pred.question.question}</td>
                      <td>{pred.answer}</td>
                      <td align="center">0</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predictions;
