import { helper } from '@ember/component/helper';
import config from 'phorest-voucher/config/environment';

export function absUrl([path]/*, hash*/) {
  return `${config.rootURL}${path}`;
}

export default helper(absUrl);
