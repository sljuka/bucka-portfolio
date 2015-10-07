import Component from '../components/component.react'
import React, {PropTypes as RPT} from 'react'
import ProcessBubble from './processbubble.react'
import ProcessSearch from '../processSearch/processSearch.react'
import provideState from '../lib/provideState'

@provideState({
  processes: ['processes']
})
export default class ProcessList extends Component {

  static propTypes = {
    processes: RPT.object.isRequired
  }

  render() {
    const processes = this.props.processes
    const processKeys = Object.keys(processes)

    return (
      <div className='row'>
        <ProcessSearch />
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
