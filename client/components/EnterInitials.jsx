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
      currentSelection: 'letter1',
    };
  }

  // componentDidUpdate() {
  //   // console.log('hey!')
  //   const { selected } = this.props;
  //   const { currentSelection } = this.state;
  //   if (selected !== currentSelection) {
  //     this.update();
  //   }
  // }

  update() {
    const { selected } = this.props;
    // const { currentSelection } = this.state;

    this.setState({
      currentSelection: selected,
    }, () => {
      const letter1 = document.getElementById('letter1');
      const letter2 = document.getElementById('letter2');
      const letter3 = document.getElementById('letter3');

      letter1.classList.remove('selected');
      letter2.classList.remove('selected');
      letter3.classList.remove('selected');

      const selectedElement = document.getElementById(`${selected}`);
      selectedElement.classList.add('selected');
    });
  }

  // key

  render() {
    const { visible, alphaNumerics, currentSelection } = this.state;
    const {
      letter1, letter2, letter3, enter, selected,
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
    if (selected !== currentSelection) {
      this.update();
    }

    return (
      <div id="enterInitials">
        <div id="initialsContainer">
          <div id="initialsHeader">
            USE ARROWS TO
            <br />
            ENTER YOUR INITIALS
          </div>
          <span id="letter1" className="initial1 selected">{alphaNumerics[letter1]}</span>
          <span id="letter2" className="initial2">{alphaNumerics[letter2]}</span>
          <span id="letter3" className="initial3">{alphaNumerics[letter3]}</span>
          {' '}
          <div>THEN PRESS ENTER</div>
        </div>
      </div>
    );
  }
}

export default EnterInitials;
