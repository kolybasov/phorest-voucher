import { helper } from '@ember/component/helper';

export function showNext([page, total]/*, hash*/) {
  return page < (total -1);
}

export default helper(showNext);
