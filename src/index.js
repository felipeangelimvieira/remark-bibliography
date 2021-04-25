import {transform} from './transform';
import bibtexUtils from "./utils";

const attacher = (template = "apa") => {
  return transform(template);
};
export default attacher;