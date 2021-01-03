/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import HiScoreEntry from './HiScoreEntry.jsx';

class HiScore extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);

    this.state = {
      scores: [
        { initials: 'AAA', score: 0 },
        { initials: 'AAA', score: 0 },
        { initials: 'AAA', score: 0 },
      ],
    };
  }

  componentDidMount() {
    const { hiScores } = this.props;
    this.setState({
      scores: hiScores,
    });
  }

  update(scores) {
    // const { hiScores } = this.props;
    this.setState({
      scores,
    });
  }

  render() {
    const { scores } = this.state;
    // const { hiScores } = this.props;

    // if (hiScores) {
    //   this.update(hiScores);
    // }
    return (
      <div id="hiscore">
        <div>HI SCORES</div>
        {scores.map((item, i) => (
          <HiScoreEntry
            initials={item.initials}
            score={item.score}
            key={i}
          />
        ))}
        {/* <HiScoreEntry initials={scores[0].initials} score={scores[0].score} />
        <HiScoreEntry initials={scores[1].initials} score={scores[1].score} />
        <HiScoreEntry initials={scores[2].initials} score={scores[2].score} /> */}
      </div>
    );
  }
}

export default HiScore;
