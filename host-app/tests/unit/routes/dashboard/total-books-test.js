import { module, test } from 'qunit';
import { setupTest } from 'host-app/tests/helpers';

module('Unit | Route | dashboard/total-books', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:dashboard/total-books');
    assert.ok(route);
  });
});
