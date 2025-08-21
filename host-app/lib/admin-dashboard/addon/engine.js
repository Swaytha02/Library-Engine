import Engine from 'ember-engines/engine';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'admin-dashboard/config/environment';

class Eng extends Engine {
  modulePrefix = config.modulePrefix;
  Resolver = Resolver;

  dependencies = {
    services: ['library-data', 'book-store', 'session', 'student-store', 'router']
  }
}

loadInitializers(Eng, config.modulePrefix);

export default Eng;
