import {open, close, startDraggingBubble, moveBubble, letGoBubble} from './actions'
import {processesCursor, processPanelCursor} from '../state'
import {register} from '../dispatcher'
import '../../lib/polyfill/find'

export const dispatchToken = register(({action, data}) => {

  switch (action) {
    case open:
      processesCursor(processes => {
        const pcss = processes.get(data.processName).toJS()
        const instance = pcss.instances.find((el) => {
          return el.id === data.instanceID
        })

        return processes.setIn([data.processName, 'opened'], instance)
      })
      break

    case close:
      processesCursor(processes => {
        const currentOpenInstance = processes.getIn([data.processName, 'opened'])

        return processes
          .setIn([data.processName, 'recentlyClosed'], currentOpenInstance)
          .setIn([data.processName, 'opened'], null)

      })
      break

    case startDraggingBubble:
      processPanelCursor(processPanel => {
        return processPanel
          .set('pressedKey', data.pressedKey)
          .set('isPressed', true)
          .set('delta', data.delta)
          .set('mouse', data.mouse)

      })
      break

    case moveBubble:
      processPanelCursor(processPanel => {
        return processPanel
          .set('mouse', data.mouse)

      })
      break

    case letGoBubble:
      processPanelCursor(processPanel => {
        return processPanel
          .set('isPressed', false)
          .set('pressedKey', null)
          .set('delta', [0, 0])

      })
      break
  }
})
