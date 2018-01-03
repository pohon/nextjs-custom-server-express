const routes = module.exports = require('next-routes')();
const Router = routes.Router;
Router.pushRouteLocale = function(route, params, options) {
  if (route[0] === '/'){
    Router.pushRoute(`/${window.localePath}${route}`); 
  }
  else {
    Router.pushRoute(route, { locale: window.localePath });
  }
}

const localeRegex = ':locale(en|id)?';

routes.add({name: 'home', pattern: `/${localeRegex}`, page: 'index'});
routes.add({name: 'chat', pattern: `/${localeRegex}/chat`, page: 'chat'});
routes.add({name: 'users', pattern: `/${localeRegex}/users`, page: 'user/index'});
routes.add({name: 'users-add', pattern: `/${localeRegex}/users/add`, page: 'user/add'});
routes.add({name: 'users-detail', pattern: `/${localeRegex}/users/:id`, page: 'user/detail'});
routes.add({name: 'about', pattern: `/${localeRegex}/about`, page: 'about'});
routes.add({name: 'register', pattern: `/${localeRegex}/register`, page: 'register'});
routes.add({name: 'webgl', pattern: `/${localeRegex}/webgl`, page: 'webgl'});