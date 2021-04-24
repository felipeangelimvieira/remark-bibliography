import bibtexUtils from './utils'
import {visit} from 'unist-util-visit'

const hasBibtex = (node) => {

    if (node.type == "html") {
        var foundBib = bibtexUtils.extractBibtex(node.value);
        return (foundBib.length > 0)
    }

    return false
}


export const transform = (tree) => {
    const visitor = (node) => {
      console.log("Visiting node")
      console.log(node.value)
      if (hasBibtex(node) === true) {
            console.log("Has bibtex!")
            node.type="code";
            node.children = undefined;
            node.lang = 'js';
            node.value = `const a = 1;`;
      }
    };

    visit(tree, `html`, visitor);
};

export default {
    transform
}