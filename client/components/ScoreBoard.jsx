import React from 'react';

function ScoreBoard(props) {
  const { score } = props;
  return (
    <div id="score">
      Score
      {' '}
      {score}
    </div>
  );
}

export default ScoreBoard;
