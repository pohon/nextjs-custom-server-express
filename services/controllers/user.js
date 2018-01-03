const request = require('./../helpers/request');
const endpoint = 'users';

exports.listUser = (req, res) => {
  request.setToken(req.session.token);
  request.get(endpoint, (err, result) => {
    if (err || !result.status) {
      return res.json({ status: false, message: 'Failed to get data' });
    }
    if (result.users.length > 0) {
      return res.json({ status: true, users: result.users });
    }
    else {
      return res.json({ status: false, message: 'No data' });
    }
  });
}

exports.addUser = (req, res) => {
  request.setToken(req.session.token);
  const data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }
  request.post(endpoint, data, (err, result) => {
    if (err || !result.status) {
      return res.json({ status: false, message: 'Failed to post data' });
    }
    return res.json({ status: true, message: 'Success to add user' });
  });
}

exports.getUser = (req, res) => {
  request.setToken(req.session.token);
  if (!req.params.id) {
    return res.json({ status: false, message: 'No id provided' });
  }

  request.get(`${endpoint}/${req.params.id}`, (err, result) => {
    if (err || !result.status) {
      return res.json({ status: false, message: 'Failed to get data' });
    }
    if(result.user) {
      return res.json({ status: true, user: result.user });
    }
    else {
      return res.json({ status: false, message: 'No data' });
    }
  });
}

exports.editUser = (req, res) => {
  request.setToken(req.session.token);
  const data = {
    id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }
  request.put(endpoint, data, (err, result) => {
    if (err || !result.status) {
      return res.json({ status: false, message: 'Failed to put data' });
    }
    return res.json({ status: true, message: 'Success to edit user' });
  });
}

exports.deleteUser = (req, res) => {
  request.setToken(req.session.token);
  const data = {
    id: req.body.id
  }
  request.delete(endpoint, data, (err, result) => {
    if (err || !result.status) {
      return res.json({ status: false, message: 'Failed to delete data' });
    }
    return res.json({ status: true, message: 'Success to delete user' });
  });
}