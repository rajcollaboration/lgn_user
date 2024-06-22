import React from 'react';

const RightSidebar = () => {
  return (
    <div className="right_sidebar order-sm-3">
      <h4 className="sidebar_heading">
        Live Chat
      </h4>
      <div className="chat_area" id="chat_div">
        <div className="chat_item">
          <div className="chaticon">
            <img src="https://dev2024.co.in/web/lgn/assets/site/images/lgn_logo.png" alt="User" />
          </div>
          <div className="chattext"><b>test1 : </b>Hello everyone</div>
        </div>
        <div className="chat_item">
          <div className="chaticon">
            <img src="https://dev2024.co.in/web/lgn/assets/site/images/lgn_logo.png" alt="User" />
          </div>
          <div className="chattext"><b>test1 : </b>Good morning</div>
        </div>
        <div className="chat_item">
          <div className="chaticon">
            <img src="https://dev2024.co.in/web/lgn/assets/site/images/lgn_logo.png" alt="User" />
          </div>
          <div className="chattext"><b>Soham Ghosh : </b>hi</div>
        </div>
        <div className="chat_item">
          <div className="chaticon">
            <img src="https://dev2024.co.in/web/lgn/assets/site/images/lgn_logo.png" alt="User" />
          </div>
          <div className="chattext"><b>Soham Ghosh : </b>hi</div>
        </div>
        {/* Additional chat items */}
        <div className="chat_item">
          <div className="chaticon">
            <img src="https://dev2024.co.in/web/lgn/assets/site/images/lgn_logo.png" alt="User" />
          </div>
          <div className="chattext"><b>Soham Ghosh : </b>hi</div>
        </div>
        <div className="chat_item">
          <div className="chaticon">
            <img src="https://dev2024.co.in/web/lgn/assets/site/images/lgn_logo.png" alt="User" />
          </div>
          <div className="chattext"><b>Soham Ghosh : </b>all good?</div>
        </div>
        <div className="chat_item">
          <div className="chaticon">
            <img src="https://dev2024.co.in/web/lgn/assets/site/images/lgn_logo.png" alt="User" />
          </div>
          <div className="chattext"><b>Soham Ghosh : </b>all good?</div>
        </div>
        {/* Additional chat items */}
        <div className="chat_item">
          <div className="chaticon">
            <img src="https://dev2024.co.in/web/lgn/assets/site/images/lgn_logo.png" alt="User" />
          </div>
          <div className="chattext"><b>Soham Ghosh : </b>all good?</div>
        </div>
        <div className="chat_item">
          <div className="chaticon">
            <img src="https://dev2024.co.in/web/lgn/assets/site/images/lgn_logo.png" alt="User" />
          </div>
          <div className="chattext"><b>Soham Ghosh : </b>all good?</div>
        </div>
        <div className="chat_item">
          <div className="chaticon">
            <img src="https://dev2024.co.in/web/lgn/assets/site/images/lgn_logo.png" alt="User" />
          </div>
          <div className="chattext"><b>test1 : </b>final t2 msg</div>
        </div>
        <div className="chat_item">
          <div className="chaticon">
            <img src="https://dev2024.co.in/web/lgn/assets/site/images/lgn_logo.png" alt="User" />
          </div>
          <div className="chattext"><b>test1 : </b>hey</div>
        </div>
        <div className="chat_item">
          <div className="chaticon">
            <img src="https://dev2024.co.in/web/lgn/assets/site/images/lgn_logo.png" alt="User" />
          </div>
          <div className="chattext"><b>test1 : </b>hi</div>
        </div>
        <div className="chat_item">
          <div className="chaticon">
            <img src="https://dev2024.co.in/web/lgn/assets/site/images/lgn_logo.png" alt="User" />
          </div>
          <div className="chattext"><b>test1 : </b>hi</div>
        </div>
      </div>
      <div className="chat_footer">
        <div className="emoji">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4d4d4d" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-smile">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
        </div>
        <textarea placeholder="Send a message" rows="1" id="txt_message"></textarea>
        <button type="button" id="btn_send" className="send_btn">Send</button>
      </div>
    </div>
  );
};

export default RightSidebar;
