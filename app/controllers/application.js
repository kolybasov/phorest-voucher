import Controller from '@ember/controller';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),

  actions: {
    authenticate(credentials) {
      let session = get(this, 'session');
      session.authenticate(credentials);
    },

    signOut() {
      let session = get(this, 'session');
      session.invalidate();
    }
  }
});
