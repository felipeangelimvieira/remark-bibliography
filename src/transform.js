const { parseBibliography, hasBibtex, bibToHtml } = require('./bibliography');
const { visitorCitation } = require('./citation' );
const visit = require('unist-util-visit');

// TODO: pass citation functions to another file

const transform = ({template }) => (tree) => {

    let bibliography = []

    const visitorBib = (node) => {
      if (hasBibtex(node) === true) {
            bibliography= parseBibliography(node.value, template = template);
            node.type="html";
            node.value = bibToHtml(bibliography);
      }
    };

    
        
    visit(tree, `html`, visitorBib);
    visit(tree, 'text', visitorCitation(bibliography))
};

module.exports.transform = transform;