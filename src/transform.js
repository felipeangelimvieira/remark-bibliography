const { visitorBibliography } = require('./bibliography');
const { visitorCitation } = require('./citation' );
const fs = require("fs")
const visit = require('unist-util-visit');

// TODO: pass citation functions to another file




const transform = ({template }) => (tree) => {

    var bibliography = []
        
    visit(tree, 'yaml', visitorBibliography(bibliography, template));
    visit(tree, 'text', visitorCitation(bibliography))

    
};

module.exports.transform = transform;