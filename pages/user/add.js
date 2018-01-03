import { Component } from 'react';
import page from '/hocs';
import withRedux from 'next-redux-wrapper';
import { initStore } from '/store';
import { createUser } from '/actions/user';
import Layout from '/components/Layout';
import UserForm from '/components/UserForm';

class AddUser extends Component {
  constructor(props) {
    super(props);

    this.createUser = this.createUser.bind(this);
  }

  createUser(user) {
    this.props.dispatch(createUser(user));
  }

  render() {
    const { isLoading } = this.props;
    return (
      <Layout title="Add User">
        <h1>Add User</h1>
        <UserForm
          user={{}}
          save={this.createUser}
          isLoading={isLoading}
        />
      </Layout>
    );
  }
}

const mapStateToProps = ({ userReducer: state }) => ({
  isLoading: state.isLoading
});

export default withRedux(initStore, mapStateToProps, null)(page(AddUser));