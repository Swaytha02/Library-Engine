import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'host-app/config/environment';
import { importSync, isDevelopingApp, macroCondition } from '@embroider/macros';

if (macroCondition(isDevelopingApp())) {
  importSync('./deprecation-workflow');
}

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;

  engines = {
    'student-dashboard': {
      dependencies: {
        services: ['library-data', 'session', 'book-store', 'student-store', 'router'],
        externalRoutes: ['login', 'profile.settings']
      }
    },
    'admin-dashboard': {
      dependencies: {
        services: ['library-data', 'book-store', 'session', 'student-store', 'router'],
        externalRoutes: ['login', 'profile.settings']
      }
    }
  }
}

loadInitializers(App, config.modulePrefix);
