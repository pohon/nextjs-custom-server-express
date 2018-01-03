import { Component } from 'react';

class CssWrapper extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default CssWrapper;