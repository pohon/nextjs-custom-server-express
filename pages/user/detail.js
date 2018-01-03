import { Component } from 'react';
import page from '/hocs';
import withRedux from 'next-redux-wrapper';
import { initStore } from '/store';
import { getUser, toggleEditUser, editUser, removeEditStatus } from '/actions/user';
import alert from '/helpers/alert';
import Layout from '/components/Layout';
import UserDetail from '/components/UserDetail';
import UserForm from '/components/UserForm';
import {Router} from '/routes';

class UserDetailPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      user: props.user
    }

    this.toggleEdit = this.toggleEdit.bind(this);
    this.editUser = this.editUser.bind(this);
    this.removeEditStatus = this.removeEditStatus.bind(this);
  }

  componentDidMount() {
    let { id } = this.props.url.query;
    this.props.dispatch(getUser(id));
  }

  toggleEdit() {
    this.setState({
      isEdit: !this.state.isEdit
    });
  }

  editUser(user) {
    this.setState({
      ...this.state,
      user
    })
    this.props.dispatch(editUser(user));
  }

  removeEditStatus() {
    this.props.dispatch(removeEditStatus());
  }

  render() {
    const { isLoading, editStatus } = this.props;
    const { user, isEdit } = this.state;

    return (
      <Layout title="User Detail">
        <h1>User Detail</h1>
        {isLoading &&
          <p>Please wait a moment...</p>
        }
        {!isLoading && user != {} && !isEdit &&
          <UserDetail 
            user={user} 
            isLoading={isLoading}
            toggleEdit={this.toggleEdit}
          />
        }
        {!isLoading && user != {} && isEdit &&
          <UserForm
            user={user}
            isLoading={isLoading}
            dismiss={this.toggleEdit}
            save={this.editUser}
          />
        }
      </Layout>
    );
  }
}

const mapStateToProps = ({ userReducer: state }) => {
  return {
    user: state.user,
    isLoading: state.isLoading,
    editStatus: state.editStatus
  }
}

export default withRedux(initStore, mapStateToProps, null)(page(UserDetailPage));