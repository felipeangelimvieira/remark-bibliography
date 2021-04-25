const visit = require('unist-util-visit');

const CITATION_RE = /@ref{(.*?)}/g;

const replaceCitations = (bibliography) => (text) => {

    const id = text.replace("@ref{",  "").replace("}","");

    var refData = bibliography.filter((item) => item.id == id);


    if (refData.length == 0) {
        return(text)
    }

    const {citation} = refData[0];
    var newText = String(`<span class="citation" data-cites="${id}">
    <a href="ref-${id}">${citation}</a>
    </span>`)

    return newText
}

const visitorCitation = (bibliography) => (node, index, parent) => {
        
    if (CITATION_RE.test(node.value) != true) {
        return(node)
    }
    
    
        
    var text = node.value;
    var matchIndex = text.search(CITATION_RE);
    var textBefore = text.slice(0, matchIndex);
    var match = text.match(CITATION_RE)[0];
    var textAfter = text.slice(matchIndex + match.length, text.length);
    var citation = match.replace(CITATION_RE, replaceCitations(bibliography));

    
    var nodeBefore = {
        type : "text",
        value : textBefore
    };

    var htmlNode = {
        type : "html",
        value : citation
    }

    var nodeAfter = {
        type : "text",
        value : textAfter
    };
    
    parent.children.splice(index, 1, nodeBefore, htmlNode, nodeAfter)
    

    return [visit.SKIP, index + 2]
    }

module.exports =  {
    CITATION_RE,
    replaceCitations,
    visitorCitation
}