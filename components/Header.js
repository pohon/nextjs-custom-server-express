import { Component } from 'react';
import PropTypes from 'prop-types';
import Link from '/components/LinkWithLocale';
import LoginModal from './LoginModal';
import { Button, Glyphicon, MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

class Header extends Component {

  static contextTypes = {
    intl: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      showLogin: false
    }

    this.changeLanguage = this.changeLanguage.bind(this);
    this.logout = this.logout.bind(this);
  }

  changeLanguage(language) {
    let pathName = window.location.pathname
    if(window.location.pathname.search(/en|id/g) > -1) {
      let s = window.location.pathname.split('/')
      s.splice(0, 2)
      pathName = '/' + s.join('/')
    }
    window.location.href = `/${language}${pathName}`;
  }

  logout() {
    this.props.logout();
  }

  render() {
    let toggleLoginModal = () => this.setState({ showLogin: !this.state.showLogin });
    const { user, menu, isLogin } = this.props;
    return (
      <div>
        <Navbar inverse fixedTop collapseOnSelect={true}>
          <Navbar.Header>
            <Navbar.Brand>
              <Link route="/">
                <a className="navbar-brand">
                  <Glyphicon glyph="piggy-bank"/> Ruhmsieg
                </a>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              {menu.map((m, id) => ( (!m.needLogin || (m.needLogin && isLogin)) ?                 
                <Link route={m.route} key={id} prefetch><NavItem eventKey={id} href="#"><FormattedMessage id={m.id} /></NavItem></Link>
                : null 
              ))}
              {/*<Link route="/" prefetch><NavItem eventKey={1} href="#"><FormattedMessage id="nav.home" /></NavItem></Link>
              {isLogin && <Link route="users" prefetch><NavItem eventKey={2} href="#"><FormattedMessage id="nav.users" /></NavItem></Link>}
              <Link route="about" prefetch><NavItem eventKey={3} href="#"><FormattedMessage id="nav.about" /></NavItem></Link>*/}

              <NavDropdown eventKey={10} title={this.context.intl.formatMessage({ id: 'nav.language' })} id="language-dropdown">
                <MenuItem eventKey={10.1} onClick={() => this.changeLanguage('en')}>EN</MenuItem>
                <MenuItem eventKey={10.2} onClick={() => this.changeLanguage('id')}>ID</MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              {!isLogin &&
                <NavDropdown eventKey={11} title={this.context.intl.formatMessage({ id: 'nav.helloguest' })} id="guest-dropdown">
                  <Link route="register"><MenuItem eventKey={11.1}><FormattedMessage id="nav.register"/></MenuItem></Link>
                  <MenuItem eventKey={11.2} onClick={toggleLoginModal}><FormattedMessage id="nav.login"/></MenuItem>
                </NavDropdown>
              }
              {isLogin &&
                <NavDropdown eventKey={11} title={this.context.intl.formatMessage({ id: 'nav.hellologin' }) + user.username} id="guest-dropdown">
                  <MenuItem eventKey={11.1} onClick={this.logout}><FormattedMessage id="nav.logout"/></MenuItem>
                </NavDropdown>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <LoginModal show={this.state.showLogin} onHide={toggleLoginModal} />
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object,
  menu: PropTypes.array.isRequired,
  logout: PropTypes.func
}

export default Header;