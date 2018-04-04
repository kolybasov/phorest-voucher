import Service from '@ember/service';
import { notEmpty, alias } from '@ember/object/computed';
import { set } from '@ember/object';
import { storageFor } from 'ember-local-storage';

export default Service.extend({
  sessionStorage: storageFor('session'),

  authHeaderName: 'Authorization',

  authHeaderValue: alias('sessionStorage.authHeaderValue'),
  isAuthenticated: notEmpty('authHeaderValue'),

  authenticate({ username, password }) {
    let encodedCredentials = window.btoa(`${username}:${password}`);
    set(this, 'authHeaderValue', `Basic ${encodedCredentials}`);
  },

  invalidate() {
    set(this, 'authHeaderValue', null);
  }
});
