import { Component } from 'react';
import PropTypes from 'prop-types';
import { Router } from '/routes';
import { connect } from 'react-redux';

const withAuth = (EnhancedComponent) => {
  class WithAuth extends Component {

    static async getInitialProps(ctx) {
      let returnValue = {};
      const { req, res } = ctx;

      if (res && req.session.isLogin === false) {
        res.redirect('/');
      }

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
        <EnhancedComponent {...this.props} />
      )
    }
  }

  const mapStateToProps = ({ authReducer: state }) => {
    return {
      session: state.session
    }
  }

  return connect(mapStateToProps)(WithAuth);
}

export default withAuth;