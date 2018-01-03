import React, { Component } from 'react';
import { Link } from '/routes';
import { connect } from 'react-redux';
import { initStore } from '/store';
import routes from '/routes';

class LinkWithLocale extends Component {
  render() {
    const { route, localePath, ...restProps } = this.props;
    let newRoute = route;
    
    if(route[0] === '/') {
      const findResult = routes.findAndGetUrls(route, {})
      newRoute = findResult.urls.as
    }

    newRoute = newRoute[0] !== '/'? `/${newRoute}` : newRoute;
    const routeWithLocale = localePath === ''? `${newRoute}` : `/${localePath}${newRoute}`;
    
    return (
      <Link
        route={routeWithLocale}
        {...restProps}
      />
    );
  }
}

const mapStateToProps = ({ appReducer: state}) => ({
  locale: state.locale,
  localePath: state.localePath
});

export default connect(mapStateToProps)(LinkWithLocale);