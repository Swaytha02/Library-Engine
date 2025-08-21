import Engine from 'ember-engines/engine';
import Resolver from 'ember-resolver';

const modulePrefix = 'student-dashboard';

const ENG = Engine.extend({
    modulePrefix,
    Resolver,

    dependencies: {
        services: ['library-data', 'session', 'book-store', 'student-store', 'router']
    }
});

export default ENG;