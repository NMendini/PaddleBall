/* eslint-disable react/no-array-index-key */
/* eslint-disable class-methods-use-this */
import React from 'react';
// import CanvasTest from './CanvasTest.jsx';
// import PaddleBall from './PaddleBall.jsx';
import Paddle from './Paddle.jsx';
import Brick from './Brick.jsx';
import Ball from './Ball.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.draw = this.draw.bind(this);
    this.update = this.update.bind(this);
    this.canvasRef = React.createRef(null);
    this.keyDown = this.keyDown.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.createBricks = this.createBricks.bind(this);

    this.state = {
      width: 800,
      height: 800,
      x: 350,
      y: 700,
      w: 100,
      h: 10,
      brickX: 10,
      brickY: 20,
      bricks: [],
      totalBricks: 60,
      ballX: 400,
      ballY: 685,
      ballMove: false,
      ballSpeedX: 0,
      ballSpeedY: 0,
      canvas: '',
      movement: 0,
      frames: 0,
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

  update() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    const {
      x, movement, ballX, ballY, ballSpeedX, ballSpeedY,
    } = this.state;

    const newPosition = (x + movement);
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

    // this.update();
    // this.forceUpdate();
    setTimeout(this.update, 10);
  }

  createBricks() {
    const { totalBricks } = this.state;
    let { brickX, brickY } = this.state;
    let color = 'red';
    const bricks = [];

    for (let i = 0; i < totalBricks; i += 1) {
      const b = { x: brickX, y: brickY, color };
      bricks.push(b);
      brickX += 79;

      if (brickX >= 750) {
        brickX = 10;
        brickY += 40;
      }

      if (brickY < 100) {
        color = 'red';
      } else if (brickY < 180) {
        color = 'purple';
      } else if (brickY < 260) {
        color = 'blue';
      }
    }
    // console.log(bricks);

    this.setState({
      bricks,
    });
  }

  keyDown(e) {
    const { ballMove } = this.state;
    // console.log(e.keyCode);
    if (e.keyCode === 39) {
      this.setState({
        movement: 20,
      });
    }

    if (e.keyCode === 37) {
      this.setState({
        movement: -20,
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
      width, height, x, y, w, h, canvas, bricks, ballX, ballY, frames,
    } = this.state;
    return (
      <div>
        <h1>This is the App</h1>
        {/* <CanvasTest draw={this.draw} /> */}
        <Ball x={ballX} y={ballY} canvas={canvas} frames={frames} />
        { bricks.map((brick, i) => (
          <Brick
            x={brick.x}
            y={brick.y}
            color={brick.color}
            canvas={canvas}
            key={i}
          />
        )) }
        <Paddle x={x} y={y} w={w} h={h} canvas={canvas} />
        <canvas id="canvas" ref={this.canvasRef} height={height} width={width} />
      </div>
    );
  }
}

export default App;
