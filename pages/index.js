import { Component } from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/Layout';
import withRedux from 'next-redux-wrapper';
import { initStore } from '/store';
import page, { pageWithAuth } from '/hocs';
import { FormattedMessage } from 'react-intl';
import alert from '/helpers/alert';
import { Link } from '/components/LinkWithLocale';

class IndexPage extends Component {

  static contextTypes = {
    intl: PropTypes.object
  }

  render() {
    return (
      <Layout>
        <h1>Home Page of {this.context.intl.formatMessage({ id: 'title' })}</h1>
        <button onClick={() => alert('Hello you!').then(() => { confirm('promise example'); })}>Alert me</button>
      </Layout>
    );
  }
}

export default withRedux(initStore, null, null)(page(IndexPage));