import {jest} from '@jest/globals'
import fs from "fs"
import remark from "remark"
import asset from "assert"
import bibtexUtils from "../src/utils.js"
import  attacher from "../src/attach.js"
import Cite from "citation-js";

test('Simple Math Test', () => {
    var text = fs.readFileSync("__tests__/data/example1.md", {encoding : "utf8"});
    const processor = remark().use(attacher);
    
    processor.process(text, (err, actual) => {
        if (err) {
            throw new Error(err);
        }
    }) 
    
    
});


test('Extract bibtex', () => {
    var text = fs.readFileSync("__tests__/data/example1.md", {encoding : "utf8"});
    var extractedBibtex = bibtexUtils.extractBibtex(text);
    expect(extractedBibtex.replace(/\s/g, '')).toBe(`@article{ledoit2004honey,
        title={Honey, I shrunk the sample covariance matrix},
        author={Ledoit, Olivier and Wolf, Michael},
        journal={The Journal of Portfolio Management},
        volume={30},
        number={4},
        pages={110--119},
        year={2004},
        publisher={Institutional Investor Journals Umbrella}
      }
      @article{lillicrap2015continuous,
        title={Continuous control with deep reinforcement learning},
        author={Lillicrap, Timothy P and Hunt, Jonathan J and Pritzel, Alexander and Heess, Nicolas and Erez, Tom and Tassa, Yuval and Silver, David and Wierstra, Daan},
        journal={arXiv preprint arXiv:1509.02971},
        year={2015}
      }`.replace(/\s/g, ''))
    
      
    
});


test('Convert bibtex to APA citation', () => {
    var text = fs.readFileSync("__tests__/data/example1.md", {encoding : "utf8"});
    var extractedBibtex = bibtexUtils.extractBibtexToJson(text);
    
    var citation = Cite(extractedBibtex).format('bibliography', {
        format : "text",
        template: "apa",
        lang: "en-US"
    });

    console.log(citation);
    
    
});