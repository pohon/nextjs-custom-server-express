const request = require('./../helpers/request');
const endpoint = 'auth';

exports.login = (req, res) => {
  const data = {
    username: req.body.username,
    password: req.body.password,
    rememberMe: req.body.rememberMe
  }
  request.post(`${endpoint}/login`, data, (err, result) => {
    if (err || !result.status) {
      return res.json({ status: false, message: 'Failed to login' });
    }
    req.session.user = result.user;
    req.session.token = result.token;
    req.session.isLogin = true;
    return res.json({ status: true, message: 'Login success' });
  });
}

exports.logout = (req, res) => {
  const data = {
    token: req.body.token
  }
  request.post(`${endpoint}/logout`, data, (err, result) => {
    if (err || !result.status) {
      return res.json({ status: false, message: 'Failed to logout' });
    }
    req.session.destroy();
    return res.json({ status: true, message: 'Logout success' });
  });
}

exports.create = (req, res) => {
  const data = {
    username: req.body.username,
    password: req.body.password
  }
  request.post(`${endpoint}/create`, data, (err, result) => {
    if (err || !result.status) {
      return res.json({ status: false, message: 'Failed to create account' });
    }
    console.log(err);
    console.log(result);
    return res.json({ status: true, message: 'Successfully creating account'});
  });
}