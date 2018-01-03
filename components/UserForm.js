import { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Validation from 'react-validation';
import { Router } from '/routes';
import Link from '/components/LinkWithLocale';
import alert from '/helpers/alert';
import '/helpers/validation';

class UserForm extends Component {
  constructor(props) {
    super(props);

    const { user } = props;
    this.state = {
      user
    }
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
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

  onCancelClick(event) {
    this.setState({
      user: this.props.user
    });
    this.props.dismiss();
  }

  onSaveClick(event) {
    if(Object.keys(this.form.validateAll()).length > 0)
      return;
    const { user } = this.state;
    this.props.save(user);
    this.setState({ user });
    console.log(this.state);

    alert('User has been saved');

    if(typeof this.props.dismiss !== 'undefined') {
      this.props.dismiss();
    }
    else {
      Router.pushRouteLocale('users');
    }
  }

  render() {
    const { user, isLoading } = this.state;
    const { dismiss } = this.props;
    return (
      <Validation.components.Form ref={c => { this.form = c }}>
        <div className="col-md-6 col-xs-6">
          {user.avatar &&
            <div className="row">
              <div className="col-md-12 col-xs-12">
                <p><img src={user.avatar} /></p>
              </div>
            </div>
          }
          <div className="row">
            <div className="col-md-4 col-xs-4">
              <p>First Name</p>
            </div>
            <div className="col-md-6 col-xs-6">
              <Validation.components.Input 
                type="text"
                value={user.first_name? user.first_name : ''}
                name="first_name"
                className="form-control"
                onChange={this.onFieldChange}
                errorContainerClassName="has-error"
                validations={['required', 'alpha']}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-xs-4">
              <p>Last Name</p>
            </div>
            <div className="col-md-6 col-xs-6">
              <Validation.components.Input 
                type="text"
                value={user.last_name? user.last_name : ''}
                name="last_name"
                className="form-control"
                onChange={this.onFieldChange}
                errorContainerClassName="has-error"
                validations={['required', 'alpha']}
              />
            </div>
          </div>
          <div className="row">
            <ButtonToolbar>
              {dismiss &&
                <Button bsStyle='danger' onClick={this.onCancelClick}>Cancel</Button>
              }
              <Button bsStyle="primary" disabled={isLoading} onClick={isLoading ? null : this.onSaveClick}>{isLoading? 'Saving..' : 'Save'}</Button>
              <Link route="users">
                <Button bsStyle="default">&laquo; Back</Button>
              </Link>
            </ButtonToolbar>
          </div>
        </div>
      </Validation.components.Form>
    );
  }
}

UserForm.propTypes = {
  user: PropTypes.object.isRequired,
  dismiss: PropTypes.func,
  save: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
}

export default UserForm;