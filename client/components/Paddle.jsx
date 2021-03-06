/* eslint-disable react/prop-types */
import React from 'react';

class Paddle extends React.Component {
  constructor(props) {
    super(props);

    this.update = this.update.bind(this);

    this.state = {
      hit: false,
    };
  }

  update() {
    const {
      x, y, w, h, canvas, ballX, ballY, ballRadius, collide,
    } = this.props;
    // const { hit } = this.state;

    canvas.fillStyle = 'black';
    canvas.fillRect(x, y, w, h);

    // // PADDLE DIMENSIONS
    // const paddleR = x + w;
    // const paddleL = x;
    // const paddleT = y;
    // const paddleB = y + h;

    // // BALL DIMENSIONS
    // const ballR = ballX + ballRadius;
    // const ballL = ballX - ballRadius;
    // const ballT = ballY - ballRadius;
    // const ballB = ballY + ballRadius;

    // if ((paddleR > ballL && paddleL < ballL) || (paddleL < ballR && paddleR > ballR)) {
    //   if ((paddleB > ballT && paddleT < ballT) || (paddleT < ballB && paddleB > ballB)) {
    //     // hit = true;
    //     let effect;
    //     if (ballX > paddleL && ballX < paddleL + w / 2) {
    //       // console.log('negative')
    //       effect = -1;
    //     } else {
    //       // console.log('positive')
    //       effect = 1;
    //     }
    //     collide(Math.random() * effect, 0, 'paddle');
    //   }
    // }
  }

  render() {
    const { canvas } = this.props;
    if (canvas) {
      this.update();
    }
    return (
      <div id="paddle" />
    );
  }
}

export default Paddle;
