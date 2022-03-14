import React from 'react';

function ApiFlash({ visible, message }) {
  return (
    <div className={`error-flash ${visible && 'is-visible'}`}>
      <div className="flash-box">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default ApiFlash;
