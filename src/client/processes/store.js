import {open, close} from './actions';
import {processesCursor} from '../state';
import {register} from '../dispatcher';
import '../../lib/polyfill/find'

export const dispatchToken = register(({action, data}) => {

  switch (action) {
    case open:
      processesCursor(processes => {
        const pcss = processes.get(data.processName).toJS()
        console.log(pcss)
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

  }
});
