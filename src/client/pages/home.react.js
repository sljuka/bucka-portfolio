import Component from '../components/component.react'
import DocumentTitle from 'react-document-title'
import React from 'react'
import {msg} from '../intl/store'
import ProcessList from '../processPanel/processlist.react'

export default class Home extends Component {

  render() {
    return (
      <DocumentTitle title={msg('home.title')}>
        <div className="home-page">
          <ProcessList processes={this.props.processes} />
        </div>
      </DocumentTitle>
    )
  }
}
