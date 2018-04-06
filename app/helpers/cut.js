import { helper } from '@ember/component/helper';

export function cut([str, length = 50]/*, hash*/) {
  if (str.length <= length) { return str; }
  return str.slice(0, length) + '…';
}

export default helper(cut);
