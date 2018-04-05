import Fragment from 'ember-data-model-fragments/fragment';
import attr from 'ember-data/attr';

export default Fragment.extend({
 creditDays: attr('number'),
 creditLimit: attr('number'),
 outstandingBalance: attr('number')
});
