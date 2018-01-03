import { Component } from 'react';
import { Button, Checkbox, Col, Form, FormControl, FormGroup, Row } from 'react-bootstrap';
import Validation from 'react-validation';
import '/helpers/validation';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      rememberMe: false
    }
    this.onFormChange = this.onFormChange.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  onFormChange(event) {
    console.log(event);
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  onCheckboxChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.checked
    });
  }

  submit(event) {
    event.preventDefault();
    if(Object.keys(this.form.validateAll()).length > 0)
      return;
    const data = {
      username: this.state.username,
      password: this.state.password,
      rememberMe: this.state.rememberMe
    }
    console.log(data);
    this.props.login(data);
  }

  render() {
    const { show, changeTab, isLoading } = this.props;
    const { username, password, rememberMe } = this.state;
    if (!show) {
      return null;
    }
    return (
      <Validation.components.Form ref={c => { this.form = c}}>
        <FormGroup controlId="formUsername">
          <Validation.components.Input 
            type="text" 
            name="username"
            className="form-control" 
            placeholder="Username" 
            value={username}
            onChange={this.onFormChange}
            validations={['required']}
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
            validations={['required']}
          />
        </FormGroup>
        <FormGroup>
          <Col className="text-center">
            <Checkbox name="rememberMe" checked={rememberMe} onChange={this.onCheckboxChange}>Remember me</Checkbox>
          </Col>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm={6} smOffset={3}>
              <Button 
                bsClass="btn-login form-control"
                onClick={isLoading ? null : this.submit}
              >
                {isLoading? <span className="fa fa-cog fa-spin fa-2x"></span> : <span>Log In</span>}
              </Button>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col lg={12} className="text-center">
              <a href="#" onClick={changeTab}>Not a member yet?</a><br />
            </Col>
          </Row>
        </FormGroup>
      </Validation.components.Form>
    );
  }
}

export default LoginForm;