/* eslint-disable react/prop-types */
import React from 'react';

class EnterInitials extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);

    this.state = {
      alphaNumerics: [
        ' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
      ],
      visible: false,
    };
  }

  componentDidUpdate() {
    // console.log('Updated!')
  }

  update() {
    // console.log('On!')
    // document.addEventListener('keydown', this.keyDown);
    // document.addEventListener('keyup', this.keyUp);

  }

  // key

  render() {
    const { visible, alphaNumerics } = this.state;
    const {
      letter1, letter2, letter3, enter,
    } = this.props;
    if (enter && !visible) {
      this.setState({
        visible: enter,
      });
    }
    if (!enter && visible) {
      this.setState({
        visible: enter,
      });
    }
    if (!visible) {
      // console.log('Off!');
      return null;
    }
    // this.update();

    return (
      <div id="enterInitials">
        <div id="initialsHeader">ENTER YOUR INITIALS</div>
        <div id="initialsContainer">
          <span className="initial1">{alphaNumerics[letter1]}</span>
          <span className="initial2">{alphaNumerics[letter2]}</span>
          <span className="initial3">{alphaNumerics[letter3]}</span>
        </div>
      </div>
    );
  }
}

export default EnterInitials;
