/* eslint-disable react/prop-types */
import React from 'react';

class Paddle extends React.Component {
  constructor(props) {
    super(props);
    // this.canvasRef = React.createRef();

    this.update = this.update.bind(this);

    this.state = {
    };
  }

  // componentDidMount() {
  //   // console.log(canvas);

  // }

  update() {
    const {
      x, y, w, h, canvas,
    } = this.props;

    canvas.fillStyle = 'black';
    canvas.fillRect(x, y, w, h);

    // console.log('Paddle running');
    // setTimeout(this.update, 10);
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
