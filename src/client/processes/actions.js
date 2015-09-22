import setToString from '../lib/settostring';
import {dispatch} from '../dispatcher';

export function open(processName, instanceID) {
  dispatch(open, {processName, instanceID})
}

export function close(processName) {
  dispatch(close, {processName})
}

export function grabBubble(key, [pressX, pressY], {pageX, pageY}) {

}

export function moveBubble() {

}

export function letGoBubble() {

}

setToString('processes', {
  open,
  close,
  grabBubble,
  moveBubble,
  letGoBubble
});
