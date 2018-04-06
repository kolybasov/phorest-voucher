import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import config from 'phorest-voucher/config/environment';

export default Model.extend({
  originalBalance: attr('number', { defaultValue: 10 }),
  serialNumber: attr('string'),
  expiryDate: attr('date', { defaultValue() { return new Date(); } }),
  issueDate: attr('date', { defaultValue() { return new Date(); } }),
  creatingBranchId: attr('string', { defaultValue: config.apiBranchId }),

  client: belongsTo('client')
});
