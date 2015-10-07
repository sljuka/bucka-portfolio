import Component from '../components/component.react'
import React, {PropTypes as RPT} from 'react'
import {Link} from 'react-router'
import {msg} from '../intl/store'
import {setMenuStyle, toggle} from '../menu/actions'
import provideState from '../lib/provideState'

@provideState({
  menu: ['menu']
})
export default class Menu extends Component {

  static propTypes = {
    menu: RPT.object.isRequired
  }

  toggleMenu(e) {
    e.preventDefault()
    toggle()
  }

  handleResize() {
    const screenWidth = window.innerWidth || document.body.clientWidth
    setMenuStyle(screenWidth)
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render() {

    const menuList = (
      <ul className="clearfix">
        <li><Link to="home">{msg('header.home')}</Link></li>
        <li><Link to="projects">{msg('header.projects')}</Link></li>
        <li><Link to="test">{msg('header.contact')}</Link></li>
      </ul>
    )

    const expanded = this.props.menu.expended
    const compact = this.props.menu.compact
    const displayMenuList = !compact || (compact && expanded)

    return (
      <nav className="main-nav clearfix">
        {compact &&
          <a
            className="toggle-menu"
            href="#"
            onClick={this.toggleMenu}
          >
          </a>
        }
        {displayMenuList &&
          menuList
        }
      </nav>
    )
  }

}
