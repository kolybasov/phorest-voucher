import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Controller.extend({
  session: service(),

  actions: {
    authenticate(credentials) {
      get(this, 'session').authenticate(credentials);
      this.transitionToRoute('index');
    }
  }
});
