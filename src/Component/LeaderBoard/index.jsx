import React from 'react'

function index({leaderboard_data}) {


    const totaltime = (totalSeconds) => {
        let hours = Math.floor(totalSeconds / 3600);
        let remainingSeconds = totalSeconds % 3600;
        let minutes = Math.floor(remainingSeconds / 60);
        let seconds = remainingSeconds % 60;
    
        if (hours > 0) {
            return hours + " hours";
        } else if (minutes > 0) {
            return minutes + " minutes";
        } else {
            return seconds+ " seconds";
        }
    }
  return (
    <div className="leader_board">
          <div className="leader_board_heading">Leaderboard</div>
          <table className="table">
            <thead>
              <tr>
                <th align="center">#</th>
                <th>Name</th>
                <th>Correct Predictions</th>
                <th align="center">Total Time</th>
              </tr>
            </thead>
            {
                leaderboard_data?.length !== 0 ? <tbody>
                {
                  leaderboard_data?.map((data,key)=> (
                  <tr key={key}>
                  <td align="center">{key+1}</td>
                  <td>{data.name}</td>
                  <td>{data.correct_predictions}</td>
                  <td align="center">{totaltime(data.total_time)}</td>
                </tr>
                  ))
                }
              </tbody> : <p className='text-center'>No data found</p>
            }
          </table>
        </div>
  )
}

export default index
