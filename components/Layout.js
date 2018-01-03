import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Header from './Header';
import Router from 'next/router';
import NProgress from 'nprogress';
import { logout, setMessage } from '/actions/auth';
import alert from '/helpers/alert';
import { MESSAGE_ACTION } from '/constants';
import nprogressStyle from '/static/css/nprogress.css';
import registerStyle from '/static/css/register.css';
import chatStyle from '/static/css/chat.css';

Router.onRouteChangeStart = (url) => {
  NProgress.start();
}
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class Layout extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    const { session } = this.props;
    this.props.logout(session.token);
  }

  componentDidUpdate() {
    const { message } = this.props;

    if (typeof message.text !== 'undefined') {
      alert(message.text).then(() => {
        switch (message.action) {
          case MESSAGE_ACTION.RELOAD:
            this.props.setMessage({});
            window.location.reload();
            break;
          case MESSAGE_ACTION.REDIRECT:
            this.props.setMessage({});
            window.location.href = message.url? message.url : '/';
            break;
          case MESSAGE_ACTION.NONE:
          default:
            this.props.setMessage({});
            break;
        }
      })
    }
  }

  render() {
    const { title, session } = this.props;
    const menu = [
      { id: 'nav.home', route: '/', needLogin: false },
      { id: 'nav.users', route: '/users', needLogin: true },
      { id: 'nav.chat', route: '/chat', needLogin: true },
      { id: 'nav.about', route: '/about', needLogin: false }
    ];
    return (
      <div>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{title? title + ' | ' : ''}Ruhmsieg</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
          <style dangerouslySetInnerHTML={{ __html: nprogressStyle }} />
          <style dangerouslySetInnerHTML={{ __html: registerStyle }} />
          <style dangerouslySetInnerHTML={{ __html: chatStyle }} />
          <style>{`
            body {
              padding-top: 50px;
            }
          `}</style>
        </Head>
        <Header 
          user={session.user} 
          menu={menu} 
          isLogin={session.isLogin}
          logout={this.logout}
        />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  title: PropTypes.string,
  user: PropTypes.object
}

const mapStateToProps = ({ authReducer: state }) => {
  return {
    session: state.session,
    message: state.message
  }
}

const mapDispatchToProps = dispatch => ({
  logout: (token) => {
    dispatch(logout(token));
  },
  setMessage: (message) => {
    dispatch(setMessage(message));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout);