const Cite  = require("citation-js");
const fs = require("fs");
const BIB_RE = /<bibliography>(.*)<\/bibliography>/gs


const parseBibliography = (bibtex, template = "apa") => {


    var allCitations = Cite(bibtex).data
    var formattedCitations = [];

    allCitations.forEach( (value) => {
        let bib =  Cite(value).format('bibliography', {
            format : "text",
            template : template
        });

        let citation = Cite(value).format("citation", {
            format : "text",
            template : template
        }).replace("(", "").replace(")", "");


        formattedCitations.push({
            id: value.id,
            bib : bib,
            citation : citation
        })
    });

    return(formattedCitations)
}


const hasBibtex = (node) => {
    return(BIB_RE.test(node.value))
}



const bibToHtml = (data) => {
    
    let html = '<div id="references">\n';

    data.forEach( (item, index) => {
        let htmlStr = `\n<li id="ref-${item.id}" class="csl-entry"> ${item.bib}</li>\n`

        html = html + htmlStr
    })

    html = html + '\n</div>'

    return(html)

}


const visitorBibliography = (bibliography, template) => (node, index, parent) => {

    var text = node.value;
    var bibPath = text.split("\n").map((value) => {
  
       return value.replace(/ /g,'')
                   .split(":");
     }).filter((value) => {
     
     return value[0] == 'bibliography'});
  
     if (bibPath.length > 0) {
       bibPath = bibPath[0][1];
  
       var bibContent = String(fs.readFileSync(bibPath));
  
       // Add items to bibliography
       bibliography.push(...parseBibliography(bibContent, template = template));
       
       const newNode = {
         type : "html",
         value : bibToHtml(bibliography)
       };
  
       parent.children.push(newNode)
     } 
  }

module.exports = {
    parseBibliography,
    hasBibtex,
    bibToHtml,
    visitorBibliography,
    BIB_RE
}

