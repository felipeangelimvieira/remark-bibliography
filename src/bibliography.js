import Cite from "citation-js";

const BIB_RE = /<bibliography>(.*)<\/bibliography>/gs

const extractBibtex = (text) => {
    
    var textMatch = text.match(BIB_RE);
    if (textMatch){
        // TODO: Make this a depedent on BIB_RE
        return( textMatch[0].replace("<bibliography>", "").replace("</bibliography>", ""))    
    }
    
    return(null)
}

const parseBibliography = (text, template = "apa") => {

    const bibtex = extractBibtex(text);

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

export default {
    extractBibtex,
    parseBibliography,
}

