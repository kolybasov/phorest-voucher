import Component from '@ember/component';
import { get, getProperties } from '@ember/object';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  routing: service('-routing'),

  tagName: '',

  username: '',
  password: '',

  login: task(function *() {
    let onLogin = get(this, 'on-login');
    let credentials = getProperties(this, ['username', 'password']);

    yield onLogin(credentials);

    return false;
  })
});
