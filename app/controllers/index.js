import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    searchClient(query) {
      return this.store.query('client', query);
    },

    createVoucher(voucher) {
      return voucher.save();
    }
  }
});
