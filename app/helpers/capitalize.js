import { helper } from '@ember/component/helper';
import { capitalize as capitalizeStr } from '@ember/string';

export function capitalize([str]/*, hash*/) {
  return capitalizeStr(str);
}

export default helper(capitalize);
