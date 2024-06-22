
import React, { useEffect, useState } from "react";
import { getlocalStorage, httpRequest } from "../../services/services";
import { useParams } from "react-router-dom";
import copy from 'copy-to-clipboard';

const MidBar = ({ tournamentData, userData, totalUsers, tournamentDetails }) => {
  const [userId, setUserId] = useState("");
  const [questions, setQuestions] = useState([]);
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('play');
  const [JWTtoken, setToken] = useState("");
  const [tournamentLeaderBoard, setTournamentLeaderBoard] = useState([]);
  // Function to handle tab clicks
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    const initialize = async () => {
      await getUser();
      await getQuestionsByTournamentId();
      await getLeaderBoard();
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
  const getLeaderBoard = async () =>{
    const header2 = {
      "Authorization": "Bearer " + JWTtoken
    }
    const leaderBoard = await httpRequest("GET",`api/tournament/get-leaderboard-by-tournament/${id}`,{},header2);
    setTournamentLeaderBoard(leaderBoard.leaderboard)
  }

  const getQuestionsByTournamentId = async () => {
    try {
      const { token } = await getlocalStorage("user_details");
      const header = {
        "x-access-token": token,
      };
      const res = await httpRequest("GET", `api/v1/questions/${id}`, {}, header);
      setQuestions(res.questions);
    } catch (err) {
      console.error("Error getting questions:", err);
    }
  };

  const followStreamer = async () => {
    try {
      await httpRequest("POST", `api/profile/follow/${tournamentData?.userId}`, {
        followerId: userId,
      });
      userData?.followers?.push(userId);
      tournamentDetails();
      getUser();
    } catch (err) {
      console.error("Error following streamer:", err);
    }
  };

  const isFollowed = () => {
    return userData?.followers?.some((follower) => follower.userId === userId);
  };

  const getSelectedOption = (question) => {
    const options = ["optionA", "optionB", "optionC", "optionD"];
    for (let option of options) {
      if (question[option]?.users?.includes(userId)) {
        return question[option]?.text;
      }
    }
    return null;
  };

  const giveAnswer = async (e, questionId, optionKey) => {
    const data = {
      optionNumber: optionKey,
      userId,
    };
    try {
      const { token } = await getlocalStorage("user_details");
      const header = {
        "x-access-token": token,
      };
      await httpRequest("PUT", `api/tournament/give-answer/${questionId}`, data, header);
      const updatedQuestions = questions.map((question) =>
        question._id === questionId
          ? { ...question, [optionKey]: { ...question[optionKey], users: [...question[optionKey].users, userId] } }
          : question
      );
      setQuestions(updatedQuestions);
    } catch (err) {
      console.error("Error submitting answer:", err);
    }
  };
  const handleCopy = () => {
    const url = window.location.href;
    copy(url);
    alert('URL copied to clipboard!');
  };
  console.log('====================================');
  console.log(tournamentLeaderBoard);
  console.log('====================================');
  return (
    <div className="stream_area order-sm-2">
      <div className="stream">
        <a href="javascript:void(0)" className="chat_toggle">
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5834 5.20837L21.8751 12.5L14.5834 19.7917V13.5417H8.33342V11.4584H14.5834V5.20837ZM4.16675 19.7917V5.20837H6.25008V19.7917H4.16675Z" fill="white" />
          </svg>
        </a>
        <iframe src={tournamentData?.streaming_link} title="YouTube video player" frameBorder="0"></iframe>
      </div>
      <div className="stream_content_area">
        <div className="tab_area">
          <div className="content_tabs">
            <div id="play" className="tab_block">
              <h3>CHOOSE YOUR ANSWER</h3>
              <div className="quiz_area">
                <div className="quiz_box" id="quiz_div">
                  {questions.map((question) => (
                    <div className="answer" key={question._id}>
                      {["optionA", "optionB", "optionC", "optionD"].map((optionKey) => (
                        <label key={optionKey}>
                          <input
                            type="radio"
                            className="ans-radio"
                            name={`question_${question._id}`}
                            value={optionKey}
                            onChange={(e) => giveAnswer(e, question._id, optionKey)}
                            disabled={!!getSelectedOption(question)}
                          />
                          <span>
                            <img src={question[optionKey].image} alt="options" /><br />
                            <span>{question[optionKey].text}</span>
                          </span>
                        </label>
                      ))}
                      <div className="question_footer">
                        <h3>{question.question}</h3>
                        <div className="answer">
                          <span>You have answered: {getSelectedOption(question)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div id="leaderboard" className="tab_block">
              <div className="leader_board">
                <div className="leader_board_heading">Leaderboard</div>
                <table className="table">
                  <thead>
                    <tr>
                      <th align="center">#</th>
                      <th>Name</th>
                      <th>Correct Predictions</th>
                      <th align="right">Total Time</th>
                    </tr>
                  </thead>
                  <tbody id="leader_tbody"></tbody>
                </table>
              </div>
            </div>
          </div>
          <ul className="tab_list">
        <li>
          <a 
            href="javascript:void(0);" 
            data_tab="play" 
            className={activeTab === 'play' ? 'active' : ''}
            onClick={() => handleTabClick('play')}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG content */}
            </svg>
            <span>Play</span>
          </a>
        </li>
        <li>
          <a 
            href="javascript:void(0);" 
            data_tab="reward" 
            className={activeTab === 'reward' ? 'active' : ''}
            onClick={() => handleTabClick('reward')}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG content */}
            </svg>
            <span>Rewards</span>
          </a>
        </li>
        <li>
          <a 
            href="javascript:void(0);" 
            data_tab="goals" 
            className={activeTab === 'goals' ? 'active' : ''}
            onClick={() => handleTabClick('goals')}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG content */}
            </svg>
            <span>Goals</span>
          </a>
        </li>
        <li>
          <a 
            href="javascript:void(0);" 
            data_tab="leaderboard" 
            className={activeTab === 'leaderboard' ? 'active' : ''}
            onClick={() => handleTabClick('leaderboard')}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG content */}
            </svg>
            <span>Leaderboard</span>
          </a>
        </li>
        <li>
          <a 
            href="javascript:void(0);" 
            data_tab="history" 
            className={activeTab === 'history' ? 'active' : ''}
            onClick={() => handleTabClick('history')}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG content */}
            </svg>
            <span>History</span>
          </a>
        </li>
      </ul>

      <div>
        {activeTab === 'play' && <div>Play Content</div>}
        {activeTab === 'reward' && <div>Rewards Content</div>}
        {activeTab === 'goals' && <div>Goals Content</div>}
        {activeTab === 'leaderboard' && <div><table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Tournament</th>
      <th scope="col">Question</th>
      <th scope="col">Correct Answer</th>
      <th scope="col">Total Time Spent</th>
    </tr>
  </thead>
  <tbody>
    {
     tournamentLeaderBoard?.length !== 0 ? tournamentLeaderBoard?.map((leader,key)=>(
      <tr key={key}>
      <th scope="row">{key+1}</th>
      <td>{leader.tournamentId.title}</td>
      <td>{leader.questionId.question}</td>
      <td ><span>{leader.correctPredictions ? "Correct" : "wrong"}</span></td>
      <td>{leader.totalTimeSpend}</td>
      </tr>
      )) : "No data found"
    }
  </tbody>
</table>
</div>}
        {activeTab === 'history' && <div>History Content</div>}
      </div>
        </div>
        <div class="content_meta">
          <div class="btn_area">
            <button
              disabled={isFollowed(userId)}
              onClick={(e) => followStreamer(e,userId)}
              class="follow_btn"
            >
              {isFollowed(userId) ? "Followed" : "Follow"}
            </button>

            <div class="dropdown subscribe_btn">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Subscribe
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="stream_options">
            <span>
              <span>{totalUsers}</span> Viewers
            </span>
            <span>05:32:00</span>
            <a href="#">
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleCopy}
              >
                <path
                  d="M7.875 10.5C7.875 11.0802 7.64453 11.6366 7.2343 12.0468C6.82406 12.457 6.26766 12.6875 5.6875 12.6875C5.10734 12.6875 4.55094 12.457 4.1407 12.0468C3.73047 11.6366 3.5 11.0802 3.5 10.5C3.5 9.91984 3.73047 9.36344 4.1407 8.9532C4.55094 8.54297 5.10734 8.3125 5.6875 8.3125C6.26766 8.3125 6.82406 8.54297 7.2343 8.9532C7.64453 9.36344 7.875 9.91984 7.875 10.5Z"
                  stroke="white"
                  stroke-width="1.5"
                />
                <path
                  d="M12.25 5.6875L7.875 8.75M12.25 15.3125L7.875 12.25"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M16.625 16.1875C16.625 16.7677 16.3945 17.3241 15.9843 17.7343C15.5741 18.1445 15.0177 18.375 14.4375 18.375C13.8573 18.375 13.3009 18.1445 12.8907 17.7343C12.4805 17.3241 12.25 16.7677 12.25 16.1875C12.25 15.6073 12.4805 15.0509 12.8907 14.6407C13.3009 14.2305 13.8573 14 14.4375 14C15.0177 14 15.5741 14.2305 15.9843 14.6407C16.3945 15.0509 16.625 15.6073 16.625 16.1875ZM16.625 4.8125C16.625 5.39266 16.3945 5.94906 15.9843 6.3593C15.5741 6.76953 15.0177 7 14.4375 7C13.8573 7 13.3009 6.76953 12.8907 6.3593C12.4805 5.94906 12.25 5.39266 12.25 4.8125C12.25 4.23234 12.4805 3.67594 12.8907 3.2657C13.3009 2.85547 13.8573 2.625 14.4375 2.625C15.0177 2.625 15.5741 2.85547 15.9843 3.2657C16.3945 3.67594 16.625 4.23234 16.625 4.8125Z"
                  stroke="white"
                  stroke-width="1.5"
                />
              </svg>
            </a>
            <a href="#">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 21.25C13.8807 21.25 15 20.1307 15 18.75C15 17.3693 13.8807 16.25 12.5 16.25C11.1193 16.25 10 17.3693 10 18.75C10 20.1307 11.1193 21.25 12.5 21.25Z"
                  fill="white"
                />
                <path
                  d="M12.5 15C13.8807 15 15 13.8807 15 12.5C15 11.1193 13.8807 10 12.5 10C11.1193 10 10 11.1193 10 12.5C10 13.8807 11.1193 15 12.5 15Z"
                  fill="white"
                />
                <path
                  d="M12.5 8.75C13.8807 8.75 15 7.63071 15 6.25C15 4.86929 13.8807 3.75 12.5 3.75C11.1193 3.75 10 4.86929 10 6.25C10 7.63071 11.1193 8.75 12.5 8.75Z"
                  fill="white"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MidBar;

