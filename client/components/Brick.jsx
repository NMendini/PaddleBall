/* eslint-disable react/prop-types */
import React from 'react';

class Brick extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);

    this.state = {
      w: 70,
      h: 30,
    };
  }

  update() {
    const { w, h } = this.state;
    const {
      x, y, canvas, color,
    } = this.props;

    canvas.fillStyle = color;
    canvas.fillRect(x, y, w, h);
  }

  render() {
    const canvas = this.props;
    if (canvas) {
      this.update();
    }
    return (
      <div></div>
    );
  }
}

export default Brick;
