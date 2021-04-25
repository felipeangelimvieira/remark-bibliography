import Cite from "citation-js";

const extractBibtex = (text) => {
    
    var textMatch = text.match(/<bibliography>(.*)<\/bibliography>/gs);
    if (textMatch){
        return( textMatch[0].replace("<bibliography>", "").replace("</bibliography>", ""))    
    }
    
    return(null)
}

const getUsefulData = (text, template = "apa") => {

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
const parseBibtex = (text) => {
    return(bibtexParse.toJSON(text));
}

export const extractBibtexToJson = (text) => {
    return(parseBibtex(extractBibtex(text)))
}

export default {
    extractBibtex,
    parseBibtex,
    extractBibtexToJson,
    getUsefulData,
}

