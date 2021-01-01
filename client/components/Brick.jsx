/* eslint-disable react/prop-types */
import React from 'react';

class Brick extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);

    this.state = {
      w: 70,
      h: 30,
      visible: true,
    };
  }

  update() {
    const {
      w, h, visible,
    } = this.state;

    const {
      x, y, canvas, color, ballX, ballY, ballRadius, collide, points, scoreIncrease,
    } = this.props;

    if (visible) {
      canvas.fillStyle = color;
      canvas.fillRect(x, y, w, h);
      canvas.shadowColor = 'rgba(75, 75, 75, 0.5)';
      canvas.shadowOffsetY = 10;
      canvas.shadowOffsetX = 10;
      canvas.shadowBlur = 3;

      // BRICK DIMENSIONS
      const brickR = x + w;
      const brickL = x;
      const brickT = y;
      const brickB = y + h;

      // BALL DIMENSIONS
      const ballR = ballX + ballRadius;
      const ballL = ballX - ballRadius;
      const ballT = ballY - ballRadius;
      const ballB = ballY + ballRadius;

      if ((brickR > ballL && brickL < ballL) || (brickL < ballR && brickR > ballR)) {
        if ((brickB > ballT && brickT < ballT) || (brickT < ballB && brickB > ballB)) {
          this.setState({
            visible: false,
          }, () => {
            let effect;
            if (ballX > brickL && ballX < brickL + w / 2) {
              // console.log('negative')
              effect = -1;
            } else {
              // console.log('positive')
              effect = 1;
            }
            collide(Math.random() * effect, 0, 'brick');
            scoreIncrease(points);
          });
        }
      }
    }
  }

  render() {
    const canvas = this.props;
    if (canvas) {
      this.update();
    }
    return (
      <div />
    );
  }
}

export default Brick;
