import Component from '../components/component.react'
import React, {PropTypes as RPT} from 'react'
import {startDraggingBubble, moveBubble, letGoBubble} from '../processPanel/actions'
import {Motion, spring} from 'react-motion'

const RANGE = [0, 1, 2, 3, 4, 5]
const COUNT = RANGE.length
const [WIDTH, HEIGHT] = [600, 450]
const LAYOUT = RANGE.map(pos => {
  const row = Math.floor(pos / 3)
  const col = pos % 3
  return [WIDTH * col, HEIGHT * row]
})

export default class Test extends Component {

  static propTypes = {
    processPanel: RPT.object.isRequired
  }

  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove.bind(this))
    window.addEventListener('touchend', this.handleMouseUp.bind(this))
    window.addEventListener('mousemove', this.handleMouseMove.bind(this))
    window.addEventListener('mouseup', this.handleMouseUp.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener(this.handleTouchMove.bind(this))
    window.removeEventListener(this.handleMouseUp.bind(this))
    window.removeEventListener(this.handleMouseMove.bind(this))
    window.removeEventListener(this.handleMouseUp.bind(this))
  }

  handleTouchMove(e) {
    e.preventDefault()
    e.stopPropagation()
    this.handleMoveBubble(e.touches[0])
  }

  handleMouseMove(e) {
    e.preventDefault()
    e.stopPropagation()
    this.handleMoveBubble({pageX: e.pageX, pageY: e.pageY})
  }

  handleMouseUp() {
    letGoBubble()
  }

  handleMoveBubble({pageX, pageY}) {
    const {examples, pressedKey, isPressed, delta: [dx, dy]} = this.props.processPanel.toJS()
    if (isPressed) {
      const mouse = [pageX - dx, pageY - dy]
      const col = this._clamp(Math.floor((mouse[0] + 40) / WIDTH), 0, 2)
      const row = this._clamp(Math.floor((mouse[1] + 40) / HEIGHT), 0, Math.floor(COUNT / 3))
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

  render() {
    const {examples, pressedKey, isPressed, mouse} = this.props.processPanel.toJS()
    return (
      <div className="demo2">
        {examples.map((key, index) => {
          let style
          let x
          let y
          const visualPosition = index
          if (key === pressedKey && isPressed) {
            [x, y] = mouse
            style = {
              translateX: x,
              translateY: y,
              scale: spring(1.1, [180, 10]),
              boxShadow: spring((x - (3 * WIDTH - 50) / 2) / 15, [180, 10]) + 5
            }
          } else {
            [x, y] = LAYOUT[visualPosition]
            style = {
              translateX: spring(x, [120, 17]),
              translateY: spring(y, [120, 17]),
              scale: spring(1, [180, 10]),
              boxShadow: '0'
            }
          }
          return (
            <Motion key={key} style={style}>
              {({translateX, translateY, scale, boxShadow}) =>
                <div
                  className="example-block"
                  onMouseDown={this.handleMouseDown.bind(null, key, [x, y])}
                  onTouchStart={this.handleTouchStart.bind(null, key, [x, y])}
                  style={{
                    backgroundColor: '#49BEAA',
                    WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                    transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                    zIndex: key === pressedKey ? 99 : visualPosition,
                    boxShadow: `${boxShadow}px 5px 5px rgba(0,0,0,0.5)`
                  }}
                >
                  {key}
                </div>
              }
            </Motion>
          )
        })}
      </div>
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
