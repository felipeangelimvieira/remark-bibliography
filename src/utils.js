import bibtexParse from '@orcid/bibtex-parse-js';

const extractBibtex = (text) => {
    
    var textMatch = text.match(/<bibliography>(.*)<\/bibliography>/gs);
    if (textMatch){
        return( textMatch[0].replace("<bibliography>", "").replace("</bibliography>", ""))    
    }
    
    return(null)
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
    extractBibtexToJson
}

