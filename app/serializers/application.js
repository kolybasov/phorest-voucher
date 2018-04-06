import JSONSerializer from 'ember-data/serializers/rest';
import { get } from '@ember/object';
import { pluralize } from 'ember-inflector';

const MULTI_REQUESTS_TYPES = [
  'query',
  'findAll'
];

export default JSONSerializer.extend({
  // Phorest API response contains model data inside of _embedded key
  // This hook extracts it and passes to default serializer's normalizer
  // For createRecord request it adds root key
  normalizeResponse(store, modelClass, resourceHash, id, requestType) {
    if (resourceHash._embedded) {
      let meta = get(resourceHash, 'page');
      resourceHash = get(resourceHash, '_embedded');
      resourceHash = Object.assign({}, resourceHash);
      if (meta) {
        resourceHash.meta = meta;
      }
    } else if (requestType === 'createRecord') {
      resourceHash = {
        [get(modelClass, 'modelName')]: resourceHash
      };
    } else {
      resourceHash = this._emptyResourceFor(modelClass, requestType);
    }
    return this._super(store, modelClass, resourceHash, id, requestType);
  },

  // Phorest API ID's are prefixed with model name.
  // Example: Client model ID is 'clientId'
  extractId(modelClass, resourceHash) {
    let modelName = get(modelClass, 'modelName');
    return resourceHash[`${modelName}Id`];
  },

  // Phorest API expects JSON without root key for creating records
  serializeIntoHash(hash, typeClass, snapshot, options) {
    Object.assign(hash, this.serialize(snapshot, options));
  },

  // Transform relationship key into '<model>Id' format
  keyForRelationship(key, relationship) {
    if (relationship === 'belongsTo') {
      return `${key}Id`;
    }
    return this._super(...arguments);
  },

  // normalizeCreateRecordResponse(store, primaryModelClass, payload, id, requestType) {
  //   console.log(store, primaryModelClass, payload, id, requestType);
  //   return this._super(...arguments);
  // },

  // When there are no results Phorest API returns nothing
  // inside of _embedded. So we need to create some value
  // for multiple and single records response
  _emptyResourceFor(modelClass, requestType) {
    let modelName = get(modelClass, 'modelName');
    if (MULTI_REQUESTS_TYPES.includes(requestType)) {
      return {
        [pluralize(modelName)]: []
      };
    }

    return {
      [modelName]: null
    };
  }
});
