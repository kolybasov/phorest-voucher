import StorageObject from 'ember-local-storage/local/object';

export default StorageObject.extend().reopenClass({
  initialState() {
    return {
      authHeaderValue: null
    };
  }
});
