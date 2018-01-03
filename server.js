const express = require('express')();
const server = require('http').Server(express);
const io = require('socket.io')(server)
const next = require('next');
const routes = require('./routes');
// const redis = require('redis');
const session = require('express-session');
const redisStore = require('connect-redis')(session);

const redisPort = 6379, redisHost = '127.0.0.1';

const Redis = require('ioredis');
global.redis = new Redis({
  port: redisPort,
  host: redisHost,
  family: 4
});


const bodyParser = require('body-parser');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);

const DEFAULT_LOCALE = 'en';

// fake DB
const messages = [
  { id: 1, username: 'vdanny', text: 'First message ever', timestamp: new Date() }
];

let users = [];

// socket.io server
io.on('connection', socket => {

  socket.on('joinChat', (data) => {
    console.log(data, 'has joined');

    if (users.filter(user => ( user === data )).length === 0) {
      users.push(data);
    }
    socket.broadcast.emit('userJoined', { username: data });
  });

  socket.on('leaveChat', (data) => {
    console.log(data, 'has left');

    users = users.filter(user => ( user !== data ));
    socket.broadcast.emit('userLeft', { username: data });
  });

  socket.on('disconnect', () => {
    console.log('Disconnected - ', socket.id);
  });

  socket.on('addMessage', (data) => {
    messages.push(data);
    socket.broadcast.emit('messageAdded', data);
  });
});

app.prepare()
.then(() => {
  // const server = express();

  express.use(bodyParser.urlencoded({ extended: true }));
  express.use(bodyParser.json());


  express.get('/services/chat/messages', (req, res) => {
    res.json({ status: true, messages })
  });
  express.get('/services/chat/users', (req, res) => {
    res.json({ status: true, users })
  });

  express.use('/:locale(en|id)?', (req, res, next) => {
    req.locale = req.params.locale? req.params.locale : DEFAULT_LOCALE;
    req.localePath = req.params.locale? req.params.locale.replace(/\//g, '') : '';
    next();
  });

  express.use(session({
    secret: 'secretkey',
    saveUninitialized: true,
    resave: false,
    name: 'ruhmsieg',
    cookie: {
      path: '/',
      httpOnly: false,
      maxAge: 6 * 60 * 60 * 1000
    },
    rolling: true,
    store: new redisStore({ client: global.redis })
  }));

  express.use((req, res, next) => {
    req.session.isLogin = req.session.isLogin || false;
    global.redis.get('VERSIONING', (err, result) => {
      if (err) {
        console.log('Error on get version from redis:', err);
      }
      req.session.version = result;
    });
    next(); 
  });

  // services route
  express.use('/services', require('./services'));

  express.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
