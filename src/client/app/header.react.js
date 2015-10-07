import Component from '../components/component.react'
import React from 'react'
import Menu from '../menu/menu.react'

class Header extends Component {

  render() {

    return (
      <header>
        <nav className="main-nav clearfix">
          <Menu />
        </nav>
      </header>
    )
  }

}

export default Header
