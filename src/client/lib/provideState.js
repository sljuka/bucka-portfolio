import React from 'react'
import {appState} from '../state'
import shallowEqual from 'react/lib/shallowEqual'

export default function provideState(stateInfo) {

  const decoratorFunction = function(Component) {

    const klass = class extends React.Component {
      static displayName = `${Component.name}StateProvider`

      state = this.getState()
      handleStateChange = this.handleStateChange.bind(this)

      constructor(props) {
        super(props)
        this.handleStateChange = this.handleStateChange.bind(this)
      }

      componentDidMount() {
        appState.on('change', this.handleStateChange)
      }

      componentWillUnmount() {
        appState.removeListener('change', this.handleStateChange)
      }

      handleStateChange() {
        this.setState(this.getState())
      }

      shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) ||
          !shallowEqual(this.state, nextState)
      }

      getState() {
        return Object.keys(stateInfo).reduce((stateObject, key) => {
          stateObject[key] = appState.get().getIn(stateInfo[key]).toJS()
          return stateObject
        }, {})
      }

      render() {
        return <Component {...this.state} {...this.props} />
      }
    }

    return klass
  }

  return decoratorFunction
}
