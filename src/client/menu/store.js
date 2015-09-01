import {toggle, setMenuStyle, open, setBlocks} from './actions';
import {menuCursor} from '../state';
import {register} from '../dispatcher';
import Immutable from 'immutable'

export const dispatchToken = register(({action, data}) => {

  const SCREEN_WIDTH_BREAKPOINT = 700

  switch (action) {

    case toggle:
      if(data === null) {
        const currentValue = menuCursor().get('expanded')
        menuCursor(menu => menu.set('expanded', !currentValue))
      } else {
        menuCursor(menu => menu.set('expanded', data))  
      }
      break;

    case setMenuStyle:
      const isCompact = data <= SCREEN_WIDTH_BREAKPOINT
      if(!isCompact)
        menuCursor(menu => menu.set('expanded', false))
      menuCursor(menu => menu.set('compact', isCompact))
      break;

    case open:
      menuCursor(menu => menu.set('open', data))
      menuCursor(menu => menu.set('initial', false))
      break;

    case setBlocks:
      menuCursor(menu => menu.set('blocks', Immutable.fromJS(data)))
      break;

  }

});
