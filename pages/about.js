import { Component } from 'react';
import Layout from '/components/Layout';
import withRedux from 'next-redux-wrapper';
import { initStore } from '/store';
import page from '/hocs';

class AboutPage extends Component {
  render() {
    return (
      <Layout title="About">
        <h1>About Page</h1>    
      </Layout>
    );
  }
}

export default withRedux(initStore, null, null)(page(AboutPage));