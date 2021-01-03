/* eslint-disable react/prop-types */
import React from 'react';

function HiScoreEntry(props) {
  const { initials, score } = props;
  return (
    <div>
      <div>
        {initials}
        {' '}
        {score}
      </div>
    </div>
  );
}

export default HiScoreEntry;
