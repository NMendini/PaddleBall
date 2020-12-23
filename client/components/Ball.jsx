/* eslint-disable react/prop-types */
import React from 'react';

class Ball extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);

    this.state = {
      start: 0,
      end: (2 * Math.PI),
    };
  }

  update() {
    const {
      x, y, canvas, r,
    } = this.props;
    const { start, end } = this.state;

    canvas.fillStyle = 'darkred';
    // canvas.fillRect(x, y, r, end);
    canvas.beginPath();
    canvas.arc(x, y, r, start, end);
    canvas.fill();

    // canvas.arc(400, 400, 50, 0, 2 * Math.PI);
    // setTimeout(this.forceUpdate, 1000);
  }

  render() {
    const { canvas } = this.props;
    if (canvas) {
      this.update();
    }
    return (
      <div />
    );
  }
}

export default Ball;
