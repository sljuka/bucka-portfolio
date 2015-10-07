import Component from '../components/component.react'
import React, {PropTypes as RPT} from 'react'
import provideState from '../lib/provideState.js'

@provideState({processNames: ['process_names']})
export default class ProcessSearch extends Component {

  static propTypes = {
    processNames: RPT.array.isRequired
  }

  render() {
    return (
      <div className='process-search'>
        <input
          name='processSearch'
          onChange={this.handleChange}
          type='text'
        >
        </input>
        {this.renderProcessList()}
      </div>
    )
  }

  handleChange() {

  }

  renderProcessList() {
    const {processNames} = this.props
    return (
      <ul className='process-list'>
        {processNames.map((pcss) => {
          return (
            <li key={pcss.id}>{pcss.name}</li>
          )
        })}
      </ul>
    )
  }

}
