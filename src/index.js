import {transform} from './transform';

const attacher = (template = "apa") => {
  return transform(template);
};
export default attacher;