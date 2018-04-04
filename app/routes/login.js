import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Route.extend({
  session: service(),

  beforeModel() {
    let isAuthenticated = get(this, 'session.isAuthenticated');
    if (isAuthenticated) {
      this.transitionTo('index');
    }
  }
});
