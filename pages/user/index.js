import { Component } from 'react';
import { Button } from 'react-bootstrap';
import withRedux from 'next-redux-wrapper';
import page, { pageWithAuth } from '/hocs';
import Layout from '/components/Layout';
import UserList from '/components/UserList';
import { initStore } from '/store';
import { loadUser, deleteUser } from '/actions/user';
import Link from '/components/LinkWithLocale';
import withAuth from '/hocs/withAuth';

class UserIndexPage extends Component {

  componentDidMount() {
    this.props.dispatch(loadUser());
  }

  deleteUser(id) {
    this.props.dispatch(deleteUser(id));
  }

  render() {
    const { users, isLoading, deleteStatus } = this.props;
    return (
      <Layout title="User List">
        <h1>
          Users List
          <Link route="/users/add"><Button bsStyle="primary" className="pull-right">Add User</Button></Link>
        </h1>
        {isLoading && 
          <p>Please wait a moment...</p>
        }
        {!isLoading && 
          <UserList 
            users={users} 
            deleteUser={this.deleteUser.bind(this)}
            deleteStatus={deleteStatus}
          />
        }
      </Layout>
    );
  }
}

const mapStateToProps = ({ userReducer: state }) => {
  return {
    users: state.users,
    isLoading: state.isLoading,
    deleteStatus: state.deleteStatus
  }
}

export default withRedux(initStore, mapStateToProps, null)(pageWithAuth(UserIndexPage));