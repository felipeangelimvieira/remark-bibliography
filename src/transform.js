import { parseBibliography, hasBibtex, bibToHtml } from './bibliography'
import { visitorCitation } from './citation' 
import {visit} from 'unist-util-visit'

// TODO: pass citation functions to another file

export const transform = ({template }) => (tree) => {

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

export default {
    transform
}