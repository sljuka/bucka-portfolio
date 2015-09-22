import Component from '../components/component.react';
import React from 'react';
import {msg} from '../intl/store';

class Login extends Component {

  handleTouchMove(e) {
    // e.preventDefault();
    // this.handleMouseMove(e.touches[0]);
  }

  handleMouseUp() {
    // this.setState({isPressed: false, delta: [0, 0]});
  }

  handleMouseMove({pageX, pageY}) {
    // const {isPressed, pressedKey, delta: [dx, dy]} = this.props.processPanel
    // if (isPressed)
      // moveBubble(pressedKey, pageX, pageY)
    // const {order, lastPress, isPressed, delta: [dx, dy]} = this.state;
    // if (isPressed) {
    //   const mouse = [pageX - dx, pageY - dy];
    //   const col = clamp(Math.floor(mouse[0] / width), 0, 2);
    //   const row = clamp(Math.floor(mouse[1] / height), 0, Math.floor(count / 3));
    //   const index = row * 3 + col;
    //   const newOrder = reinsert(order, order.indexOf(lastPress), index);
    //   this.setState({mouse: mouse, order: newOrder});
    // }
  }

  handleTouchStart(key, pressLocation, e) {
    // this.handleMouseDown(key, pressLocation, e.touches[0]);
  }

  handleMouseDown(key, [pressX, pressY], {pageX, pageY}) {
    // this.setState({
    //   lastPress: key,
    //   isPressed: true,
    //   delta: [pageX - pressX, pageY - pressY],
    //   mouse: [pressX, pressY],
    // });
  }

  render() {
    const elements = this.props.processPanel.get('examples').toJS();

    return (
      <div
        className='canvas'
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onTouchEnd={this.handleMouseUp}
        onTouchMove={this.handleTouchMove}>
        {elements.map((el, key) =>
          <div
            className="example-block"
            key={el.key}
          >{el.text}</div>
        )}
      </div>
    );
  }

}

export default Login;
