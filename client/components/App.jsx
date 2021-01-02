/* eslint-disable react/no-array-index-key */
/* eslint-disable class-methods-use-this */
import React from 'react';
// import CanvasTest from './CanvasTest.jsx';
// import PaddleBall from './PaddleBall.jsx';
import Paddle from './Paddle.jsx';
import Brick from './Brick.jsx';
import Ball from './Ball.jsx';
import ScoreBoard from './ScoreBoard.jsx';
import StartScreen from './StartScreen.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.currentScore = 0;
    this.themeSound = null;
    this.failSound = null;
    this.paddleHit = null;
    this.brickHit = [];
    this.wallHit = null;
    this.brickCount = 0;
    // this.draw = this.draw.bind(this);
    this.update = this.update.bind(this);
    this.canvasRef = React.createRef(null);
    this.keyDown = this.keyDown.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.createBricks = this.createBricks.bind(this);
    this.handleCollision = this.handleCollision.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.CreateSound = this.CreateSound.bind(this);

    this.state = {
      gameStart: false,
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
      theme: '../assets/PaddleBallTheme.ogg',
      fail: '../assets/PaddleBallFail.ogg',
      paddleHit: '../assets/PaddleBallPaddleHit.ogg',
      brickHits: ['../assets/PaddleBallBrickHit01.ogg', '../assets/PaddleBallBrickHit02.ogg', '../assets/PaddleBallBrickHit03.ogg', '../assets/PaddleBallBrickHit04.ogg'],
      wallHit: '../assets/PaddleBallWallHit.ogg',
    };
  }

  componentDidMount() {
    const {
      theme, fail, paddleHit, brickHits, wallHit,
    } = this.state;

    this.update();
    document.addEventListener('keydown', this.keyDown);
    document.addEventListener('keyup', this.keyUp);
    this.createBricks();
    // window.score = 0;
    this.themeSound = new this.CreateSound(theme);
    this.failSound = new this.CreateSound(fail);
    this.paddleHit = new this.CreateSound(paddleHit);
    this.wallHit = new this.CreateSound(wallHit);

    brickHits.forEach((item) => {
      this.brickHit.push(new this.CreateSound(item));
    });

    // setTimeout(this.themeSound.play, 800);
  }

  // draw(ctx, frameCount) {
  //   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //   ctx.fillStyle = '#FFF000';
  //   ctx.beginPath();
  //   ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
  //   ctx.fill();
  // }

  handleCollision(x = 0, y = 0, source) {
    const {
      ballSpeedY, ballSpeedX, hit, gameStart, renderSpeed,
    } = this.state;
    if (gameStart) {
      const moveY = ballSpeedY + y;
      let moveX = ballSpeedX + x;

      if (!hit) {
        if (source === 'brick') {
          const randomIndex = Math.floor((Math.random() * this.brickHit.length - 1) + 1);
          // this.brickHit[randomIndex].stop();
          this.brickHit[randomIndex].play();
          moveX = -(moveX);
        }

        if (source === 'paddle') {
          // this.paddleHit.stop();
          this.paddleHit.play();
          moveX = -(moveX);
        }

        if (source === 'wall') {
          // this.wallHit.stop();
          this.wallHit.play();
        }

        this.setState({
          hit: true,
          ballSpeedY: -(moveY),
          ballSpeedX: -(moveX),
        }, () => {
          setTimeout(() => {
            this.setState({
              hit: false,
            });
          }, renderSpeed * 4);
        });
      }
    }
  }

  handleScore(points) {
    this.currentScore += points;
    this.brickCount += 1;

    this.setState({
      score: this.currentScore,
    });
  }

  // RENDERING AND BOUNDRIES
  update() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    const {
      x, y, w, h, movement, renderSpeed, width, height, ballRadius, ballMove, totalBricks,
    } = this.state;

    let {
      ballX, ballY, ballSpeedX, ballSpeedY, gameStart,
    } = this.state;

    // paddle position temp variable
    let newPosition = (x + movement);

    // RESET
    const reset = () => {
      this.brickCount = 0;
      newPosition = 350;
      ballX = 400;
      ballY = 685;
      ballSpeedX = 0;
      ballSpeedY = 0;
      gameStart = false;

      this.setState({
        gameStart: false,
        ballMove: false,
        ballSpeedX: 0,
        ballSpeedY: 0,
        ballX: 400,
        ballY: 685,
      });

      this.setState({
        totalBricks: 0,
      }, () => {
        this.createBricks();
        this.setState({
          totalBricks,
        }, () => {
          this.createBricks();
        });
      });
    };

    // BALL OUT OF BOUNDS (End Round)
    if (ballY - ballRadius >= height) {
      this.themeSound.stop();
      this.failSound.play();
      this.currentScore = 0;
      this.setState({
        score: 0,
      });
      reset();
    }

    if (this.brickCount >= totalBricks) {
      reset();
    }

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

    // during game
    if (gameStart) {
      // PADDLE DIMENSIONS
      const paddleR = x + w;
      const paddleL = x;
      const paddleT = y;
      const paddleB = y + h;

      // BALL DIMENSIONS
      const ballR = ballX + ballRadius;
      const ballL = ballX - ballRadius;
      const ballT = ballY - ballRadius;
      const ballB = ballY + ballRadius;

      // BALL COLLISION & BOUNDRIES
      if ((ballL) <= 0) {
        ballX = ballRadius;
        this.handleCollision(0, moveY * -2, 'wall');
      }

      if ((ballR) >= width) {
        ballX = width - ballRadius;
        this.handleCollision(0, moveY * -2, 'wall');
      }

      if ((ballT) <= 0) {
        ballY = ballRadius;
        this.handleCollision(moveX * -2, 0, 'wall');
      }

      if (ballL >= paddleL && ballR <= paddleR) {
        if (ballB > paddleT && ballT < paddleT + h / 4) {
          ballY = paddleT - ballRadius;
        }
      }

      // BALL & PADDLE COLLISION
      if ((paddleR > ballL && paddleL < ballL) || (paddleL < ballR && paddleR > ballR)) {
        if (paddleT < ballB && paddleB > ballY) {
          // hit = true;
          let effect;
          if (ballX > paddleL && ballX < paddleL + w / 2) {
            // console.log('negative')
            effect = -2;
          } else {
            // console.log('positive')
            effect = 2;
          }
          this.handleCollision(Math.random() * effect, 0, 'paddle');
        }
      }
    }

    // ball position temp variable
    const ballPositionX = (ballX + ballSpeedX);
    const ballPositionY = (ballY + ballSpeedY);

    ctx.fillStyle = 'steelblue';
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
    let color = 'crimson';
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
        color = 'crimson';
        points = 2000;
      } else if (brickY < 180) {
        color = 'orange';
        points = 1000;
      } else if (brickY < 260) {
        color = 'green';
        points = 500;
      } else if (brickY < 340) {
        color = 'blue';
        points = 250;
      }
    }

    this.setState({
      bricks,
    });
  }

  CreateSound(source) {
    this.sound = document.createElement('audio');
    this.sound.src = source;
    this.sound.volume = 0.1;
    this.sound.setAttribute('preload', 'auto');
    this.sound.setAttribute('controls', 'none');
    this.sound.style.display = 'none';
    this.play = () => {
      this.sound.currentTime = 0;
      this.sound.play();
    };
    this.stop = () => {
      this.sound.pause();
      this.sound.currentTime = 0;
    };
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
      this.themeSound.play();
      this.setState({
        gameStart: true,
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
      width, height, x, y, w, h, canvas, bricks, ballX, ballY,
      ballRadius, ballSpeedX, ballMove, score,
    } = this.state;
    return (
      <div>
        <h1 id="gameName">PADDLEBALL</h1>
        <ScoreBoard score={score} />
        <StartScreen start={ballMove} />
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
