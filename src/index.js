const {transform} = require('./transform');

const plugin = (template = "apa") => {
  return transform(template);
};
module.exports = plugin
module.exports.transform = transform;