import Component from '../components/component.react';
import React from 'react';
import {Link} from 'react-router'
import {msg} from '../intl/store'
import {setMenuStyle, toggle} from '../menu/actions'

export default class Menu extends Component {

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

    const menuList =
      <ul className="clearfix">
        <li><Link to="home">{msg('header.home')}</Link></li>
        <li><Link to="projects">{msg('header.projects')}</Link></li>
        <li><Link to="contact">{msg('header.contact')}</Link></li>
        <li><a href="#">Design</a></li>
        <li><a href="#">Web 2.0</a></li>
        <li><a href="#">Tools</a></li> 
      </ul> 

    const expanded = this.props.menu.get('expanded')
    const compact = this.props.menu.get('compact')
    const displayMenuList = !compact || (compact && expanded)

    return (
      <nav className="main-nav clearfix">
        {compact &&
          <a href="#" className="toggle-menu" onClick={this.toggleMenu}></a>
        }
        {displayMenuList &&
          menuList
        }
      </nav>
    );
  }

}
