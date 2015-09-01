import * as actions from '../examples/actions';
import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import Editable from '../components/editable.react';
import React from 'react';
import immutable from 'immutable';
import {msg} from '../intl/store';
import {TransitionSpring} from 'react-motion';
import {setBlocks} from '../menu/actions'

class Examples extends Component {

  getEndValue() {
    let blocks = this.props.menu.get('blocks').toJS();
    let configs = {};
    Object.keys(blocks).forEach(key => {
      configs[key] = {
        height: {val: 50, config: [180, 12]},
        opacity: {val: 1, config: [180, 12]},
        text: blocks[key], // interpolate the above 2 fields only
      };
    });
    return configs;
  }

  willEnter(key) {
    let blocks = this.props.menu.get('blocks').toJS();
    return {
      height: {val: 50},
      opacity: {val: 1},
      text: blocks[key],
    };
  }

  willLeave(key, value, endValue, currentValue, currentSpeed) {
    // the key with this value is truly killed when the values reaches destination
    return {
      height: {val: 0},
      opacity: {val: 0},
      text: currentValue[key].text,
    };
  }

  handleClick(key) {
    let {...newBlocks} = this.props.menu.get('blocks').toJS();
    delete newBlocks[key];
    setBlocks(newBlocks);
  }

  render() {
    return (
      <TransitionSpring
        endValue={this.getEndValue()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}>
        {currentValue =>
          <div>
            {Object.keys(currentValue).map(key => {
              let style = {
                height: currentValue[key].height.val,
                opacity: currentValue[key].opacity.val,
              };
              return (
                <div onClick={this.handleClick.bind(this, key)} key={key} style={style}>
                  {currentValue[key].text}
                </div>
              );
            })}
          </div>
        }
      </TransitionSpring>
    );
  }

}

export default Examples;
