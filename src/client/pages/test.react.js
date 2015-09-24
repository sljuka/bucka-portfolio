import Component from '../components/component.react'
import React from 'react'
import {startDraggingBubble} from '../processes/actions'

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
    this.handleMouseDown(key, pressLocation, e.touches[0])
  }

  handleMouseDown(key, [pressX, pressY], {pageX, pageY}) {
    startDraggingBubble({
      draggedKey: key,
      isPressed: true,
      delta: [pageX - pressX, pageY - pressY],
      mouse: [pressX, pressY]
    })
  }

  getValues() {
    const [width, height] = [120, 70, 90]
    const layout = [0, 1, 2, 3, 4].map(pos => {
      const row = Math.floor(pos / 3)
      const col = pos % 3
      return [width * col, height * row]
    })

    const {examples, isPressed, mouse, pressedKey} = this.props.processPanel.toJS()
    const positioned = examples.sort((a, b) => a.position >= b.position)

    return {
      order: positioned.map((el, index) => {
        if (el.key === pressedKey && isPressed)
          return {val: mouse, config: [], element: el}

        return {val: layout[index], config: [120, 17], element: el}
      }),
      scales: {
        val: [0, 1, 2, 3, 4].map((_, key) => pressedKey === key && isPressed ? 1.2 : 1),
        config: [180, 10]
      }
    }
  }

  render() {
    const [top, left] = [100, 150]
    const data = this.getValues()
    return (
      <div
        className='canvas'
        onMouseMove={this.handleMouseMove.bind(this)}
        onMouseUp={this.handleMouseUp.bind(this)}
        onTouchEnd={this.handleMouseUp.bind(this)}
        onTouchMove={this.handleTouchMove.bind(this)}>
        {data.order.map(({val: [x, y], config, element}) =>
          <div
            className="example-block"
            key={element.key}
            onMouseDown={this.handleMouseDown.bind(null, element.key, [x, y])}
            onTouchStart={this.handleTouchStart.bind(null, element.key, [x, y])}
            style={{
                    backgroundColor: element.color,
                    transform: `translate3d(${x + left}px, ${y + top}px, 0) scale(1)`,
                    WebkitTransform: `translate3d(${x + left}px, ${y + top}px, 0) scale(1)`,
                    zIndex: element.key === 1 ? 99 : 1
                  }}
          >example {element.key}
          </div>
        )}
      </div>
    )
  }

}

export default Login
