import EmberRouter from '@ember/routing/router';
import config from 'host-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.mount('student-dashboard', { as: 'student' });
  this.mount('admin-dashboard', { as: 'admin' });
  this.route('login-page', { path: '/login' });
  this.route('error-Page', { path: '/*' });

  this.route('profile', function() {
    this.route('settings');
  });
});
