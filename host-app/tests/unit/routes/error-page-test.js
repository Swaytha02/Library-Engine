import { module, test } from 'qunit';
import { setupTest } from 'host-app/tests/helpers';

module('Unit | Route | error-Page', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:error-page');
    assert.ok(route);
  });
});
