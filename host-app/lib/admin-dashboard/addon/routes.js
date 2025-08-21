import buildRoutes from 'ember-engines/routes';

export default buildRoutes(function () {
  this.route('dashboard', function() {
    this.route('book-issued'),
    this.route('total-books'),
    this.route('total-users'),
    this.route('total-students')
  });
});
