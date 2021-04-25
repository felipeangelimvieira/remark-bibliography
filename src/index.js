const {transform} = require('./transform');

const attacher = (template = "apa") => {
  return transform(template);
};
module.exports = attacher;