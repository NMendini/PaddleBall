import React from 'react';

function StartScreen(props) {
  const { start } = props;
  if (start) {
    return null;
  }
  return (
    <div className="startContainer">
      <div id="start">
        MOVE PADDLE WITH
        <br />
        LEFT & RIGHT ARROWS
        <br />
        <br />
        PRESS SPACEBAR TO BEGIN
      </div>
    </div>
  );
}

export default StartScreen;
