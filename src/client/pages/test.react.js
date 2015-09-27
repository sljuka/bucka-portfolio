import Component from '../components/component.react'
import React from 'react'
import {startDraggingBubble, moveBubble, letGoBubble} from '../processPanel/actions'
import {Spring} from 'react-motion'

const RANGE = [0, 1, 2, 3, 4, 5]
const COUNT = RANGE.length
const [WIDTH, HEIGHT, TOP, LEFT] = [300, 200, 0, 0]

class Login extends Component {

  _layout() {
    const {examples} = this.props.processPanel.toJS()
    let retVal = {}
    for (let i = 0; i < examples.length; i++) {
      const row = Math.floor(i / 3)
      const col = i % 3
      retVal[examples[i]] = [WIDTH * col, HEIGHT * row]
    }
    console.log(retVal)
    return retVal
  }

  handleTouchMove(e) {
    e.preventDefault()
    this.handleMouseMove(e.touches[0])
  }

  handleMouseUp() {
    letGoBubble()
  }

  handleMouseMove({pageX, pageY}) {
    const {examples, pressedKey, isPressed, delta: [dx, dy]} = this.props.processPanel.toJS()
    if (isPressed) {
      const mouse = [pageX - dx, pageY - dy]
      const col = this._clamp(Math.floor(mouse[0] / WIDTH), 0, 2)
      const row = this._clamp(Math.floor(mouse[1] / HEIGHT), 0, Math.floor(COUNT / 3))
      const newIndex = row * 3 + col
      const newOrder = this._reinsert(examples, examples.indexOf(pressedKey), newIndex)
      moveBubble({
        mouse: mouse,
        examples: newOrder
      })
    }
  }

  handleTouchStart(key, pressLocation, e) {
    this.handleMouseDown(key, pressLocation, e.touches[0])
  }

  handleMouseDown(key, [pressedX, pressedY], {pageX, pageY}) {
    const deltaX = pageX - pressedX
    const deltaY = pageY - pressedY
    startDraggingBubble({
      pressedKey: key,
      delta: [deltaX, deltaY],
      mouse: [pressedX, pressedY]
    })
  }

  getValues() {
    const {examples, isPressed, mouse, pressedKey} = this.props.processPanel.toJS()
    const layout = this._layout()
    return {
      order: examples.map((key) => {
        if (key === pressedKey && isPressed)
          return {val: mouse, config: []}
        return {val: layout[key], config: [120, 17]}
      }),
      scales: {
        val: examples.map((key) => (key === pressedKey && isPressed) ? 1.2 : 1),
        config: [180, 10]
      }
    }
  }

  render() {
    const {examples, pressedKey} = this.props.processPanel.toJS()
    return (
      <Spring endValue={this.getValues()}>
        {({order: currOrder, scales: {val: scales}}) =>
          <div
            className='canvas'
            onMouseMove={this.handleMouseMove.bind(this)}
            onMouseUp={this.handleMouseUp.bind(this)}
            onTouchEnd={this.handleMouseUp.bind(this)}
            onTouchMove={this.handleTouchMove.bind(this)}>
            {currOrder.map(({val: [x, y]}, index) =>
              <div
                className="example-block"
                data-key={examples[index]}
                key={examples[index]}
                onMouseDown={this.handleMouseDown.bind(null, examples[index], [x, y])}
                onTouchStart={this.handleTouchStart.bind(null, examples[index], [x, y])}
                style={{
                        backgroundColor: '#EF767A',
                        transform: `translate3d(${x + LEFT}px, ${y + TOP}px, 0) scale(${scales[examples[index]]})`,
                        WebkitTransform: `translate3d(${x + LEFT}px, ${y + TOP}px, 0) scale(${scales[examples[index]]})`,
                        zIndex: examples[index] === pressedKey ? 99 : 1
                      }}
              >{examples[index]}
              </div>
            )}
          </div>
        }
      </Spring>
    )
  }

  _reinsert(arr, from, to) {
    const _arr = arr.slice(0)
    const val = _arr[from]
    _arr.splice(from, 1)
    _arr.splice(to, 0, val)
    return _arr
  }

  _clamp(n, min, max) {
    return Math.max(Math.min(n, max), min)
  }

}

export default Login
