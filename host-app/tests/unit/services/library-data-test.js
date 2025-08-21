import { module, test } from 'qunit';
import { setupTest } from 'host-app/tests/helpers';

module('Unit | Service | library-data', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:library-data');
    assert.ok(service);
  });
});
