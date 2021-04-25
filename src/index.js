import {transform} from './transform';
import bibtexUtils from "./bibliography";

const attacher = (template = "apa") => {
  return transform(template);
};
export default attacher;