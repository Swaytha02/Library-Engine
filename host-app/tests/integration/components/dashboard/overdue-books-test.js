import { module, test } from 'qunit';
import { setupRenderingTest } from 'host-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | dashboard/overdue-books', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Dashboard::OverdueBooks />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Dashboard::OverdueBooks>
        template block text
      </Dashboard::OverdueBooks>
    `);

    assert.dom().hasText('template block text');
  });
});
