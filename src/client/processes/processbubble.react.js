import Component from '../components/component.react'
import React from 'react'
import {Spring} from 'react-motion'
import {open, close} from './actions'
import config from './config'

export default class ProcessBubble extends Component {

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
      <div>
        <button onClick={() => this.handleCloseClick(pcss.name)}>Close</button>
        <Spring
          defaultValue={opened ? {val: {val: 100, config: [300, 50]}} : {val: {val: 1, config: [300, 50]}}} 
          endValue={opened ? {val: {val: 100, config: [300, 50]}} : {val: {val: 1, config: [300, 50]}}}>
          {tween => this.renderAnimatedProcessList(tween.val.val)}
        </Spring>
      </div>
    )
  }

  renderAnimatedProcessList(frameNo) {

    const pcss = this.props.process
    const openedInstance = pcss.opened || pcss.recentlyClosed

    return(
      <ul ref='list' style={this.listStyle()}>
        {pcss.instances.map(instance => {
          const open = openedInstance && openedInstance.id === instance.id
          const height = open ?
            (config.bubbleItemHeight + (config.bubbleHeight - config.bubbleItemHeight) * Math.round(frameNo)/100) - 3 : 
            (config.bubbleItemHeight - config.bubbleItemHeight * Math.round(frameNo)/100)

          return (
            <li onClick={() => this.handleClick(pcss.name, instance.id)}
                style={open ? this.openStyle(height) : this.closeStyle(height)}
                key={instance.id}>
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
    if(val >= borderMargin || val <= 1)
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
    if(val >= borderMargin || val <= 1)
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
