import Component from '../components/component.react'
import React from 'react'
import {Spring} from 'react-motion'
import {open, close} from './actions'

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
          const height = open ? (50 + 150 * Math.round(frameNo)/100) : (50 - 50 * Math.round(frameNo)/100)

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
      height: 50,
      overflow: 'hidden'
    }
  }

  openStyle(val) {
    let bbottom = '1px solid'
    if(val >= 197 || val <= 1)
      bbottom = null

    return {
      ...this.defaultStyle(),
      height: val,
      borderBottom: bbottom
    }
  }

  closeStyle(val) {
    let bbottom = '1px solid'
    if(val >= 199 || val <= 1)
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
      height: 203,
      overflowY: 'auto'
    }
  }

}
