import React from 'react'

const LeftSidebar = () => {
  return (
    <div>
        <div class="left_sidebar order-sm-1">
<h4 class="sidebar_heading bg_red">
    Live Predict
</h4>

<div class="quiz_area">
    <div class="quiz_box" id="quiz_div"></div>
    <div class="result_area">
        <div class="result_box">
            <h4>You Won!</h4>
            <p>Rewards: 200 Rupees</p>
        </div>
    </div>
   
</div>

<div class="leader_board">
    <div class="leader_board_heading">
        Leaderboard
    </div>
    <table class="table">
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
  )
}

export default LeftSidebar