import setToString from '../lib/settostring'
import {dispatch} from '../dispatcher'

export function open(processName, instanceID) {
  dispatch(open, {processName, instanceID})
}

export function close(processName) {
  dispatch(close, {processName})
}

export function startDraggingBubble(data) {
  dispatch(startDraggingBubble, data)
}

export function moveBubble() {

}

export function letGoBubble() {

}

setToString('processes', {
  close,
  letGoBubble,
  moveBubble,
  open,
  startDraggingBubble
})
