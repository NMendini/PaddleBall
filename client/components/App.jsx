/* eslint-disable react/no-array-index-key */
/* eslint-disable class-methods-use-this */
import React from 'react';
// import CanvasTest from './CanvasTest.jsx';
// import PaddleBall from './PaddleBall.jsx';
import Paddle from './Paddle.jsx';
import Brick from './Brick.jsx';
import Ball from './Ball.jsx';
import ScoreBoard from './ScoreBoard.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.draw = this.draw.bind(this);
    this.update = this.update.bind(this);
    this.canvasRef = React.createRef(null);
    this.keyDown = this.keyDown.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.createBricks = this.createBricks.bind(this);
    this.handleCollision = this.handleCollision.bind(this);
    this.handleScore = this.handleScore.bind(this);

    this.state = {
      width: 800,
      height: 800,
      x: 350,
      y: 700,
      w: 100,
      h: 15,
      brickX: 10,
      brickY: 20,
      bricks: [],
      totalBricks: 80,
      ballX: 400,
      ballY: 685,
      ballMove: false,
      ballSpeedX: 0,
      ballSpeedY: 0,
      ballRadius: 15,
      canvas: '',
      movement: 0,
      renderSpeed: 10,
      hit: false,
      score: 0,
    };
  }

  componentDidMount() {
    // console.log('mounting');
    this.update();
    // setInterval(this.update, 1000);
    document.addEventListener('keydown', this.keyDown);
    document.addEventListener('keyup', this.keyUp);
    this.createBricks();
  }

  // draw(ctx, frameCount) {
  //   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //   ctx.fillStyle = '#FFF000';
  //   ctx.beginPath();
  //   ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
  //   ctx.fill();
  // }

  handleCollision(x = 0, y = 0, source) {
    const { ballSpeedY, ballSpeedX, hit } = this.state;
    const moveY = ballSpeedY + y;
    let moveX = ballSpeedX + x;

    if (source === 'brick' || source === 'paddle') {
      moveX = -(moveX);
    }

    if (!hit) {
      this.setState({
        hit: true,
        ballSpeedY: -(moveY),
        ballSpeedX: -(moveX),
      }, () => {
        setTimeout(() => {
          this.setState({
            hit: false,
          });
        }, 80);
      });
    }
  }

  handleScore(points) {
    const { score } = this.state;
    const newScore = score + points;

    this.setState({
      score: newScore,
    });
  }

  update() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    const {
      x, w, movement, ballSpeedX, ballSpeedY, renderSpeed, width, ballRadius, ballMove,
    } = this.state;

    let { ballX, ballY } = this.state;

    // paddle position temp variable
    let newPosition = (x + movement);

    // PADDLE BOUNDRIES
    if (newPosition < 0) {
      newPosition = 0;
    }
    if (newPosition + w > width) {
      newPosition = width - w;
    }

    // ball start position
    if (!ballMove) {
      ballX = (newPosition + w / 2);
    }

    // ball movement temp variable
    const moveX = ballSpeedX;
    const moveY = ballSpeedY;

    // BALL COLLISION & BOUNDRIES
    if ((ballX - ballRadius) <= 0) {
      ballX = ballRadius;
      this.handleCollision(0, moveY * -2);
    }

    if ((ballX + ballRadius) >= width) {
      ballX = width - ballRadius;
      this.handleCollision(0, moveY * -2);
    }

    if ((ballY - ballRadius) <= 0) {
      ballY = ballRadius;
      this.handleCollision(moveX * -2);
    }

    // ball position temp variable
    const ballPositionX = (ballX + ballSpeedX);
    const ballPositionY = (ballY + ballSpeedY);

    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, 800, 800);

    this.setState({
      canvas: ctx,
      x: newPosition,
      ballX: ballPositionX,
      ballY: ballPositionY,
    });

    setTimeout(this.update, renderSpeed);
  }

  createBricks() {
    const { totalBricks } = this.state;
    let { brickX, brickY } = this.state;
    let color = 'red';
    let points = 2000;
    const bricks = [];

    for (let i = 0; i < totalBricks; i += 1) {
      const b = {
        x: brickX, y: brickY, color, points,
      };
      bricks.push(b);
      brickX += 79;

      if (brickX >= 750) {
        brickX = 10;
        brickY += 40;
      }

      if (brickY < 100) {
        color = 'red';
        points = 2000;
      } else if (brickY < 180) {
        color = 'purple';
        points = 1000;
      } else if (brickY < 260) {
        color = 'blue';
        points = 500;
      } else if (brickY < 340) {
        color = 'green';
        points = 250;
      }
    }

    this.setState({
      bricks,
    });
  }

  keyDown(e) {
    const { ballMove } = this.state;
    // console.log(e.keyCode);
    if (e.keyCode === 39) {
      this.setState({
        movement: 10,
      });
    }

    if (e.keyCode === 37) {
      this.setState({
        movement: -10,
      });
    }

    if (e.keyCode === 32 && !ballMove) {
      this.setState({
        ballMove: true,
        ballSpeedY: -10,
      });
    }
  }

  keyUp(e) {
    // console.log('keyUp');
    if (e.keyCode === 39 || e.keyCode === 37) {
      this.setState({
        movement: 0,
      });
    }
  }

  render() {
    const {
      width, height, x, y, w, h, canvas, bricks, ballX, ballY, ballRadius, ballSpeedX, score,
    } = this.state;
    return (
      <div>
        <h1>This is the App</h1>
        <ScoreBoard score={score} />
        {/* <CanvasTest draw={this.draw} /> */}
        <Ball x={ballX} y={ballY} canvas={canvas} r={ballRadius} />
        { bricks.map((brick, i) => (
          <Brick
            className="brick"
            x={brick.x}
            y={brick.y}
            points={brick.points}
            color={brick.color}
            ballX={ballX}
            ballY={ballY}
            ballRadius={ballRadius}
            canvas={canvas}
            key={i}
            id={i}
            collide={this.handleCollision}
            scoreIncrease={this.handleScore}
          />
        )) }
        <Paddle
          x={x}
          y={y}
          w={w}
          h={h}
          ballX={ballX}
          ballY={ballY}
          ballRadius={ballRadius}
          ballSpeedX={ballSpeedX}
          canvas={canvas}
          collide={this.handleCollision}
        />
        <canvas id="canvas" ref={this.canvasRef} height={height} width={width} />
      </div>
    );
  }
}

export default App;
