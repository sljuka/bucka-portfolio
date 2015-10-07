import Component from '../components/component.react'
import React, {PropTypes as RPT} from 'react'
import {startDraggingBubble, moveBubble, letGoBubble} from '../processPanel/actions'
import {Motion, spring} from 'react-motion'
import ProcessBubble from '../processPanel/processbubble.react'
import provideState from '../lib/provideState'

const [WIDTH, HEIGHT] = [600, 440]

@provideState({
  processPanel: ['processPanel'],
  processes: ['processes']
})
export default class Test extends Component {

  static propTypes = {
    processPanel: RPT.object.isRequired,
    processes: RPT.object.isRequired
  }

  componentDidMount() {
    document.addEventListener('touchmove', this.handleTouchMove.bind(this))
    document.addEventListener('touchend', this.handleMouseUp.bind(this))
    document.addEventListener('mousemove', this.handleMouseMove.bind(this))
    document.addEventListener('mouseup', this.handleMouseUp.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener('touchmove', this.handleTouchMove.bind(this))
    document.removeEventListener('touchend', this.handleMouseUp.bind(this))
    document.removeEventListener('mousemove', this.handleMouseMove.bind(this))
    document.removeEventListener('mouseup', this.handleMouseUp.bind(this))
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
    const {isPressed} = this.props.processPanel
    if (isPressed)
      letGoBubble()
  }

  handleMoveBubble({pageX, pageY}) {
    const {examples, pressedKey, isPressed, delta: [dx, dy]} = this.props.processPanel
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
    const {pressedKey, isPressed, mouse} = this.props.processPanel
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
              boxShadow: spring((x - (3 * WIDTH - 50) / 2) / 15, [180, 10]) + 5,
              scale: spring(1.1, [180, 10]),
              translateX: x,
              translateY: y
            }
          } else {
            [x, y] = layout[visualPosition]
            style = {
              boxShadow: '0',
              scale: spring(1, [180, 10]),
              translateX: spring(x, [120, 17]),
              translateY: spring(y, [120, 17])
            }
          }
          return (
            <Motion key={pcss.id} style={style}>
              {({translateX, translateY, scale, boxShadow}) =>
                <div
                  className="example-block"
                  style={{
                    WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                    transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                    zIndex: pcss.id === pressedKey ? 99 : visualPosition,
                    boxShadow: `${boxShadow}px 5px 5px rgba(0,0,0,0.5)`
                  }}
                >
                  <ProcessBubble
                    mouseDownHeader={(e) => this.handleMouseDown(pcss.id, [x, y], e)}
                    process={pcss}
                    touchStartHeader={(e) => this.handleTouchStart(pcss.id, [x, y], e)}
                  />
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
    const processes = this.props.processes
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
