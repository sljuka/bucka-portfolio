import Component from '../components/component.react'
import React, {PropTypes as RPT} from 'react'
import {setBlocks} from '../menu/actions'
import {TransitionMotion, spring} from 'react-motion'
import provideState from '../lib/provideState'

@provideState({
  blocks: ['menu', 'blocks']
})
export default class Projects extends Component {

  static propTypes = {
    blocks: RPT.object.isRequired
  }

  getDefaultValue() {
    let blocks = this.props.blocks
    return Object.keys(blocks)
      .reduce((configs, key) => {
        configs[key] = {
          height: spring(0, [180, 12]),
          opacity: spring(1, [180, 12]),
          text: blocks[key] // interpolate the above 2 fields only
        }
        return configs
      }, {})
  }

  getEndValue() {
    let blocks = this.props.blocks
    return Object.keys(blocks)
      .reduce((configs, key) => {
        configs[key] = {
          height: spring(50, [180, 12]),
          opacity: spring(1, [180, 12]),
          text: blocks[key] // interpolate the above 2 fields only
        }
        return configs
      }, {})
  }

  willEnter(key) {
    let blocks = this.props.blocks
    return {
      height: spring(0, [180, 12]),
      opacity: spring(1, [180, 12]),
      text: blocks[key]
    }
  }

  willLeave(key, value, endValue, currentValue, currentSpeed) {
    // the key with this value is truly killed when the values reaches destination
    return {
      height: spring(0),
      opacity: spring(0),
      text: currentValue[key].text
    }
  }

  handleClick(key) {
    let {...newBlocks} = this.props.blocks
    setBlocks(newBlocks)
  }

  render() {
    return (
      <TransitionMotion
        styles={this.getEndValue()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {configs =>
          <div>
            {Object.keys(configs).map(key => {
              let style = {
                height: configs[key].height,
                opacity: configs[key].opacity
              }
              return (
                <div key={key} onClick={this.handleClick.bind(this, key)} style={style}>
                  {configs[key].text}
                </div>
              )
            })}
          </div>
        }
      </TransitionMotion>
    )
  }

}
