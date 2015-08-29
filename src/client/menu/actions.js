import setToString from '../lib/settostring';
import {dispatch} from '../dispatcher';

export function toggle(value = null) {
  dispatch(toggle, value)
}

export function setMenuStyle(screenWidth) {
  dispatch(setMenuStyle, screenWidth)
}

export function open(val) {
  dispatch(open, val)
}

setToString('demos', {
  toggle,
  setMenuStyle,
  open
});
