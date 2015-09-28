import Component from '../components/component.react'
import React from 'react'
import ProcessBubble from './processbubble.react'

export default class ProcessList extends Component {

  render() {
    const processes = this.props.processes.toJS()
    const processKeys = Object.keys(processes)

    return (
      <div className='row'>
        {processKeys.map(processKey => {
          const pcss = processes[processKey]

          return (
            <div className='col-xs-4' key={pcss.id}>
              <ProcessBubble process={pcss} />
            </div>
          )
        })}
      </div>
    )
  }

}
