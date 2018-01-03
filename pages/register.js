import { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import Layout from '/components/Layout';
import LoginForm from '/components/LoginForm';
import RegisterForm from '/components/RegisterForm';
import CssWrapper from '/components/CssWrapper';
import { initStore } from '/store';
import { login, register } from '/actions/auth';
import { pageWithGuest } from '/hocs';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: 'register'
    }

    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(tab) {
    this.setState({
      show: tab
    });
  }

  render() {
    const { register, login, isLoading } = this.props;
    const { show } = this.state;
    const changeTabLogin = () => this.changeTab('login');
    const changeTabRegister = () => this.changeTab('register');
    return (
      <Layout title="Register">
        <CssWrapper>
          <link rel='stylesheet' type='text/css' href='/static/css/register.css' />
        </CssWrapper>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="panel panel-login">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-xs-6">
                    <a className={show === 'register'? 'active' : ''} id="register-form-link" onClick={changeTabRegister}>Register</a>
                  </div>
                  <div className="col-xs-6">
                    <a className={show === 'login'? 'active' : ''} id="login-form-link" onClick={changeTabLogin}>Login</a>
                  </div>
                </div>
                <hr/>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-lg-12">
                    <RegisterForm 
                      show={show === 'register'}
                      changeTab={changeTabLogin}
                      register={register}
                      isLoading={isLoading}
                    />
                    <LoginForm 
                      show={show === 'login'}
                      changeTab={changeTabRegister}
                      login={login}
                      isLoading={isLoading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = ({ authReducer: state }) => ({
  isLoading: state.isLoading
});

const mapDispatchToProps = dispatch => ({
  register: (user) => {
    dispatch(register(user));
  },
  login: (user) => {
    dispatch(login(user));
  }
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(pageWithGuest(RegisterPage));