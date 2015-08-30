import setToString from '../lib/settostring';
import {dispatch} from '../dispatcher';

export function open(processName, instanceID) {
  dispatch(open, {processName, instanceID})
}

export function close(processName) {
  dispatch(close, {processName})
}

setToString('processes', {
  open,
  close
});
