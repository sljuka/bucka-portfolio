import React from 'react'
import {appState} from '../state'

export default function provideState(stateInfo) {

  const keys = Object.keys(stateInfo)
  const state = keys.reduce((stateObject, key) => {
    stateObject[key] = appState.get().getIn(stateInfo[key]).toJS()
    return stateObject
  }, {})

  const decoratorFunction = function(Component) {

    const klass = class extends React.Component {
      static displayName = `${Component.name}StateProvider`

      render() {
        return <Component {...state} />
      }
    }

    return klass
  }

  return decoratorFunction
}
