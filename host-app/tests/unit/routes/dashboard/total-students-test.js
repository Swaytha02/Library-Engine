import { module, test } from 'qunit';
import { setupTest } from 'host-app/tests/helpers';

module('Unit | Route | dashboard/total-students', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:dashboard/total-students');
    assert.ok(route);
  });
});
