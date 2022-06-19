import React from 'react';

function MyTeams({ data }) {
  return (
    <div>
      <h4>Teams you have played with</h4>
      <div className="my-data-item outlined">
        {data.teams_list.map((item, index) => (
          <p key={index + 1}>{item}</p>
        ))}
      </div>
    </div>
  );
}

export default MyTeams;
