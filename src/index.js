const {transform} = require('./transform');

const plugin = (options = {}) => {
  return transform(options);
};
module.exports = plugin
module.exports.transform = transform;