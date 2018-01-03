import { Component } from 'react';
import Layout from '/components/Layout';

export default EnhancedComponent => class WithLayout extends Component {
  render() {
    return (
      <Layout>
        <EnhancedComponent />
      </Layout>
    );
  }
}