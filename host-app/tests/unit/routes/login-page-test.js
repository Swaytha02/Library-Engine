import { module, test } from 'qunit';
import { setupTest } from 'host-app/tests/helpers';

module('Unit | Route | login-page', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:login-page');
    assert.ok(route);
  });
});
