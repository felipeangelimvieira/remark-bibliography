const {transform} = require('./transform');

const plugin = (template = "apa") => {
  return transform(template);
};
export { plugin , transform };