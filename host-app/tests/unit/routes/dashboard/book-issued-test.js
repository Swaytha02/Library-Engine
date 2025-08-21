import { module, test } from 'qunit';
import { setupTest } from 'host-app/tests/helpers';

module('Unit | Route | dashboard/book-issued', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:dashboard/book-issued');
    assert.ok(route);
  });
});
