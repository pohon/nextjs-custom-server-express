import { Component } from 'react';
import { connect } from 'react-redux';
import { setSession } from '/actions/auth';

const withSession = (EnhancedComponent) => {
  class WithSession extends Component {
    static async getInitialProps(ctx) {
      const { req, store } = ctx;
      let returnValue = {}, 
          session = {};

      if (req) {
        session = { 
          isLogin: req.session.isLogin,
          user: req.session.user || {},
          token: req.session.token,
          version: req.session.version
        }
        store.dispatch(setSession(session));
      }

      returnValue = { session };

      if (EnhancedComponent.getInitialProps) {
        returnValue = {
          ...returnValue,
          ...await EnhancedComponent.getInitialProps(ctx)
        }
      }
      return returnValue;
    }

    render() {
      return (
        <EnhancedComponent {...this.props}/>
      );
    }
  }

  const mapStateToProps = ({ authReducer: state }) => {
    return {
      session: state.session
    }
  };

  return connect(mapStateToProps)(WithSession);
}

export default withSession;