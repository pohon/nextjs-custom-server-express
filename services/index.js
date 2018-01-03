const express = require('express');
const router = express.Router();

const userCtrl = require('./controllers/user');
router.get('/users', userCtrl.listUser);
router.post('/users', userCtrl.addUser);
router.put('/users', userCtrl.editUser);
router.delete('/users', userCtrl.deleteUser);
router.get('/users/:id(\\d+)', userCtrl.getUser);

const authCtrl = require('./controllers/auth');
router.post('/auth/login', authCtrl.login);
router.post('/auth/logout', authCtrl.logout);
router.post('/auth/create', authCtrl.create);

const appCtrl = require('./controllers/app');
router.get('/app/versioning', appCtrl.versioning);

module.exports = router;