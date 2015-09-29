import Component from '../components/component.react'
import React, {PropTypes as RPT} from 'react'
import {startDraggingBubble, moveBubble, letGoBubble} from '../processPanel/actions'
import {Motion, spring} from 'react-motion'
import ProcessBubble from '../processPanel/processbubble.react'

const [WIDTH, HEIGHT] = [600, 440]

export default class Test extends Component {

  static propTypes = {
    processPanel: RPT.object.isRequired,
    processes: RPT.object.isRequired
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
      const row = this._clamp(Math.floor((mouse[1] + 40) / HEIGHT), 0, Math.floor(this._count() / 3))
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
    const layout = this._layout()
    return (
      <div className="demo2">
        {this._range().map((pcss, index) => {
          let style
          let x
          let y
          const visualPosition = index
          if (pcss.id === pressedKey && isPressed) {
            [x, y] = mouse
            style = {
              translateX: x,
              translateY: y,
              scale: spring(1.03, [180, 10]),
              boxShadow: spring((x - (3 * WIDTH - 50) / 2) / 15, [180, 10]) + 5
            }
          } else {
            [x, y] = layout[visualPosition]
            style = {
              translateX: spring(x, [120, 17]),
              translateY: spring(y, [120, 17]),
              scale: spring(1, [180, 10]),
              boxShadow: '0'
            }
          }
          return (
            <Motion key={pcss.id} style={style}>
              {({translateX, translateY, scale, boxShadow}) =>
                <div
                  className="example-block"
                  onMouseDown={this.handleMouseDown.bind(null, pcss.id, [x, y])}
                  onTouchStart={this.handleTouchStart.bind(null, pcss.id, [x, y])}
                  style={{
                    WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                    transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                    zIndex: pcss.id === pressedKey ? 99 : visualPosition,
                    boxShadow: `${boxShadow}px 5px 5px rgba(0,0,0,0.5)`
                  }}
                >
                  <ProcessBubble process={pcss} />
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

  _count() {
    return this.props.processes.size
  }

  _range() {
    const processes = this.props.processes.toJS()
    return Object.keys(processes)
      .reduce((array, key) => {
        array.push(processes[key])
        return array
      }, [])
  }

  _layout() {
    return this._range()
      .map((_, index) => {
        const row = Math.floor(index / 3)
        const col = index % 3
        return [WIDTH * col, HEIGHT * row]
      })
  }

}
