import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import React from 'react';
import {Link} from 'react-router';
import {FormattedHTMLMessage} from 'react-intl';
import {msg} from '../intl/store';
import {Spring} from 'react-motion';
import {open} from '../menu/actions';

export default class Home extends Component {

  clickMa() {
    const opn = this.props.menu.get('open')
    open(!opn)
  }

  startStyle() {
    return {
      border: '1px solid',
      padding: 0,
      height: 203,
      overflowY: 'auto'
    }
  }

  innerStyle() {
    return {
      width: '100%',
      borderBottom: '1px solid',
      height: 50,
      overflow: 'hidden'
    }
  }

  innerOpen(val) {

    let bbottom = '1px solid'
    if(val >= 197 || val <= 1)
      bbottom = null
    return {
      ...this.innerStyle(),
      height: val,
      borderBottom: bbottom
    }
  }

  innerClose(val) {
    return {
      ...this.innerOpen(val),
      height: val
    } 
  }

  offStyle() {
    return {
      width: '100%',
      height: 100,
      display: 'inline-block',
      borderBottom: '1px solid'
    }
  }

  render() {

    const clk = this.props.menu.get('open')
    const init = this.props.menu.get('initial')
    const processes = this.props.processes.toJS()
    const processKeys = Object.keys(processes)
    const firstProcess = processes[processKeys[0]]

    return (
      <DocumentTitle title={msg('home.title')}>
        <div className="home-page">
          <button onClick={this.clickMa.bind(this)}>clickma</button>
          <div className='row'>
            <div className='col-xs-4'>
                
              <Spring
                defaultValue={{val: {val: 1, config: [300, 50]}}} 
                endValue={clk ? {val: {val: 99, config: [300, 50]}} : {val: {val: 1, config: [300, 50]}}}>
                
                {tween => {
                  return (
                    <ul ref='list' style={this.startStyle()}>
                    {firstProcess.instances.map(pcs => {
                      const open = firstProcess.opened
                      let pct = tween.val.val
                      let st = open ? (50 + 150 * Math.round(pct)/100) : (50 - 50 * Math.round(pct)/100)
                      if(init)
                        st = 50

                      return (
                        <li style={(clk && open) ? this.innerOpen(st) : this.innerClose(st)} key={pcs.id}>
                          {`${pcs.name} [${pcs.version}]`}
                        </li>
                      )
                    })}
                    </ul>
                  )
                }}
              </Spring>
            </div>

            <div className='col-xs-4'>
              <div style={this.startStyle()}>
                <div style={this.offStyle()}>
                  Some text here
                </div>
              </div>
            </div>

            <div className='col-xs-4'>
              <div style={this.startStyle()}>
                <div style={this.offStyle()}>
                  Some text here
                </div>
              </div>
            </div>
          </div>

        </div>
      </DocumentTitle>
    );
  }

}
