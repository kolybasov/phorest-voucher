import Fragment from 'ember-data-model-fragments/fragment';
import attr from 'ember-data/attr';

export default Fragment.extend({
  city: attr('string'),
  country: attr('string'),
  postalCode: attr('string'),
  state: attr('string'),
  streetAddress1: attr('string'),
  streetAddress2: attr('string')
});
