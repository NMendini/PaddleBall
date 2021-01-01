import React from 'react';

function ScoreBoard(props) {
  const { score } = props;
  return (
    <div id="score">
      SCORE
      {' '}
      {score}
    </div>
  );
}

export default ScoreBoard;
