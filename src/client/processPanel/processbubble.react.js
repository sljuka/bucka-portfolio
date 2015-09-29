import Component from '../components/component.react'
import React, {PropTypes as RPT} from 'react'
import {Motion, spring} from 'react-motion'
import {open, close} from './actions'
import config from './config'

export default class ProcessBubble extends Component {

  static propTypes = {
    process: RPT.object.isRequired
  }

  handleClick(processName, instanceID) {
    open(processName, instanceID)
  }

  handleCloseClick(processName) {
    close(processName)
  }

  render() {
    const pcss = this.props.process
    const opened = pcss.opened

    return (
      <div className='process-bubble'>
        <h2>{pcss.name}</h2>
        <button onClick={() => this.handleCloseClick(pcss.name)}>Close</button>
        <Motion
          style={{animatedValue: spring((opened ? 100 : 1), [240, 30])}}
        >
          {({animatedValue}) => this.renderAnimatedProcessList(animatedValue)}
        </Motion>
      </div>
    )
  }

  renderAnimatedProcessList(animatedValue) {
    const pcss = this.props.process
    const openedInstance = pcss.opened || pcss.recentlyClosed

    return (
      <ul ref='list' style={this.listStyle()}>
        {pcss.instances.map(instance => {
          const open = openedInstance && openedInstance.id === instance.id
          const height = open ?
            (config.bubbleItemHeight + (config.bubbleHeight - config.bubbleItemHeight) * Math.round(animatedValue) / 100) - 3 :
            (config.bubbleItemHeight - config.bubbleItemHeight * Math.round(animatedValue) / 100)

          return (
            <li
              key={instance.id}
              onClick={() => this.handleClick(pcss.name, instance.id)}
              style={open ? this.openStyle(height) : this.closeStyle(height)}
            >
              {`${instance.name} [${instance.version}]`}
            </li>
          )
        })}
      </ul>
    )
  }

  defaultStyle() {
    return {
      width: '100%',
      borderBottom: '1px solid',
      height: config.bubbleItemHeight,
      overflow: 'hidden'
    }
  }

  openStyle(val) {
    let bbottom = '1px solid'
    const borderMargin = config.bubbleHeight - 4
    if (val >= borderMargin || val <= 1)
      bbottom = null

    return {
      ...this.defaultStyle(),
      height: val,
      borderBottom: bbottom
    }
  }

  closeStyle(val) {
    let bbottom = '1px solid'
    const borderMargin = config.bubbleHeight - 4
    if (val >= borderMargin || val <= 1)
      bbottom = null

    return {
      ...this.defaultStyle(val),
      height: val,
      borderBottom: bbottom
    }
  }

  listStyle() {
    return {
      border: '1px solid',
      padding: 0,
      height: config.bubbleHeight,
      overflowY: 'auto'
    }
  }

}
