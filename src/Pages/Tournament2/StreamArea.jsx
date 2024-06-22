import React from 'react';

const StreamArea = () => {
  return (
    <div>
      <div className="stream_area order-sm-2">
        <div className="stream">
          <iframe
            src="https://www.youtube.com/embed/S-KAG0qv_u8"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen=""
          ></iframe>
        </div>
      </div>
      <div className="stream_content">
        <figure>
          <img src="https://dev2024.co.in/web/lgn/assets/site/images/lgn_logo.png" alt="Logo" />
        </figure>
        <figcaption>
          <h5>
            This is a test tournament 2{' '}
            <svg
              viewBox="0 0 18 18"
              height="18"
              width="18"
              preserveAspectRatio="xMidYMid meet"
              version="1.1"
              x="0px"
              y="0px"
              enableBackground="new 0 0 18 18"
            >
              <title>psa-verified</title>
              <polygon
                id="Star-2"
                fill="#00DA60"
                points="9,16 7.1,16.9 5.8,15.2 3.7,15.1 3.4,13 1.5,12 2.2,9.9 1.1,8.2 2.6,6.7 2.4,4.6 4.5,4 5.3,2 7.4,2.4 9,1.1 10.7,2.4 12.7,2 13.6,4 15.6,4.6 15.5,6.7 17,8.2 15.9,9.9 16.5,12 14.7,13 14.3,15.1 12.2,15.2 10.9,16.9 "
              ></polygon>
              <polygon
                id="Check-Icon"
                fill="#FFFFFF"
                points="13.1,7.3 12.2,6.5 8.1,10.6 5.9,8.5 5,9.4 8,12.4 "
              ></polygon>
            </svg>
          </h5>
          <h4>
            Welcome to Day 4 of Lenovo + Intel presents Convergence 2023 by Riot Games and The Esports Club (TEC) |
            Riot's first International Tournament in India. <br />
            Today's Schedule:<br />
            12.30 PM IST: Influencer Showmatch | BO1<br />
            2.00 PM IST: Grand Finals - Vitality vs Fut Esports | BO5<br />
          </h4>
          <p>LGN</p>
        </figcaption>
        <span className="watching">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#b7b7b7"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-eye"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <span id="watching_span">209 Watching</span>
        </span>
      </div>
    </div>
  );
};

export default StreamArea;
