import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Checkbox, Col, ControlLabel, Form, FormControl, FormGroup, Modal } from 'react-bootstrap';
import { login, setMessage } from '/actions/auth';
import { Router } from '/routes';

class LoginModal extends Component {

  constructor(props) { 
    super(props)
    this.input = {};
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    const data = {
      username: this.input.username.value,
      password: this.input.password.value,
      rememberMe: this.input.rememberMe.checked
    }
    this.props.login(data);
  }

  render() {
    const { isLoading, show, onHide } = this.props;
    return (
      <Modal show={show} onHide={onHide} bsSize="small" aria-labelledby="contained-modal-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm" className="text-center">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal onSubmit={this.submit}>
            <FormGroup controlId="formHorizontalUsername">
              <Col componentClass={ControlLabel} sm={4}>
                Username
              </Col>
              <Col sm={8}>
                <FormControl type="text" placeholder="Username" inputRef={ref => { this.input.username = ref; }} required/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={4}>
                Password
              </Col>
              <Col sm={8}>
                <FormControl type="password" placeholder="Password" inputRef={ref => { this.input.password = ref; }} required/>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={4} sm={8}>
                <Checkbox inputRef={ref => { this.input.rememberMe = ref; }}>Remember me</Checkbox>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={4} sm={8}>
                <Button type="submit">
                  Sign in
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
        {isLoading && 
          <Modal.Footer>
            <p className="text-center">Please wait...</p>
          </Modal.Footer>
        }
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  isLoading: PropTypes.bool, 
  show: PropTypes.bool, 
  onHide: PropTypes.func
}

const mapStateToProps = ({ authReducer: state }) => {
  return {
    isLoading: state.isLoading,
    message: state.message,
    token: state.session.token,
    user: state.user
  };
}

const mapDispatchToProps = dispatch => {
  return {
    login: user => {
      dispatch(login(user));
    },
    setMessage: message => {
      dispatch(setMessage(message));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);