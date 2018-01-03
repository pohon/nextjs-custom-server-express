import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar } from 'react-bootstrap';
import Validation from 'react-validation';
import Link from '/components/LinkWithLocale';
import alert from '/helpers/alert';
import '/helpers/validation';

class UserDetail extends Component {
  constructor(props) {
    super(props);

    let { user } = props;
    this.state = {
      user: user
    }
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
  }

  onFieldChange(event) {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      }
    });
  }

  onEditClick(event) {
    this.setState({
      user: this.props.user
    });
    this.props.toggleEdit();
  }

  onSaveClick(event) {
    if(Object.keys(this.form.validateAll()).length > 0)
      return;
    let { user } = this.state;
    this.props.editUser(user);
    this.setState({ user });
    this.props.toggleEdit();
    alert('User has been edited').
      then(() => {});
  }

  render() {
    let { isLoading } = this.props;
    let { user } = this.state;
    if (!user) {
      return (
        <div>
          <h3>No user found!</h3>
          <Link href="/users"><a>&laquo; Back to home</a></Link>
        </div>
      );
    }

    return (
      <div className="col-md-6 col-xs-6">
        <div className="row">
          <div className="col-md-12 col-xs-12">
            <p><img src={user.avatar} /></p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-xs-4">
            <p>First Name</p>
          </div>
          <div className="col-md-6 col-xs-6">
            <p>:<b> {user.first_name}</b></p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-xs-4">
            <p>Last Name</p>
          </div>
          <div className="col-md-6 col-xs-6">
            <p>:<b> {user.last_name}</b></p>
          </div>
        </div>
        <div className="row">
          <ButtonToolbar>
            <Button bsStyle='primary' onClick={this.onEditClick}>Edit</Button>
            <Link route="/users">
              <Button bsStyle="default">&laquo; Back</Button>
            </Link>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}

UserDetail.propTypes = {
  isLoading: PropTypes.bool.isRequired, 
  user: PropTypes.object.isRequired,
  toggleEdit: PropTypes.func,
  editUser: PropTypes.func
}

export default UserDetail;