import { Component } from 'react';
import { Button, Col, Form, FormGroup, FormControl, Row } from 'react-bootstrap';
import Validation from 'react-validation';
import '/helpers/validation';

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      confirmPassword: ''
    }

    this.onFormChange = this.onFormChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  onFormChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  submit(event) {
    event.preventDefault();
    if(Object.keys(this.form.validateAll()).length > 0)
      return;
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.register(user);
  }

  render() {
    const { show, changeTab, isLoading } = this.props;
    const { username, password, confirmPassword } = this.state;
    if (!show) {
      return null;
    }
    return (
      <Validation.components.Form ref={c => { this.form = c }}>
        <FormGroup controlId="formUsername">
          <Validation.components.Input 
            type="text"
            name="username"
            className="form-control" 
            placeholder="Username" 
            value={username}
            onChange={this.onFormChange}
            validations={['required', 'alpha']}
          />
        </FormGroup>
        <FormGroup controlId="formPassword">
          <Validation.components.Input 
            type="password"
            name="password"
            className="form-control" 
            placeholder="Password" 
            value={password}
            onChange={this.onFormChange}
            validations={['required', 'password']}
          />
        </FormGroup>
        <FormGroup controlId="formConfirmPassword">
          <Validation.components.Input 
            type="password"
            name="confirmPassword"
            className="form-control" 
            placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={this.onFormChange}
            validations={['required', 'password']}
          />
        </FormGroup>
        <FormGroup controlId="formSubmit">
          <Row>
            <Col sm={6} smOffset={3}>
              <Button 
                bsClass="btn-register form-control"
                onClick={isLoading ? null : this.submit}
              >
                {isLoading? <span className="fa fa-cog fa-spin fa-2x"></span> : <span>Register Now</span>}
              </Button>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup controlId="formSubmit">
          <Row>
            <Col sm={6} smOffset={3} className="text-center">
              <a href="#" onClick={changeTab}>Already has an account?</a>
            </Col>
          </Row>
        </FormGroup>
      </Validation.components.Form>
    );
  }
}

export default RegisterForm;