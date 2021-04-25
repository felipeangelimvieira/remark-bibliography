import {jest} from '@jest/globals'
import fs from "fs"
import remark from "remark"
import asset from "assert"
import bibtexUtils from "../src/utils.js"
import  attacher from "../src/attach.js"
import remarkHtml from 'remark-html'

test('.md output is correct', () => {
    var text = fs.readFileSync("__tests__/data/markdown_with_bibtex.md", {encoding : "utf8"});
    const processor = remark().use(attacher);
    const refText = fs.readFileSync("__tests__/data/markdown_with_bibtex_after.md", { encoding : "utf8"});

    processor.process(text, (err, actual) => {
        if (err) {
            throw new Error(err);
        }

        var actualText = String(actual)
        expect(refText).toEqual(actualText);

    }) 
    
    
});


test('extracts bibtex as expected', () => {
    var text = fs.readFileSync("__tests__/data/markdown_with_bibtex.md", {encoding : "utf8"});
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


test('parses info from bibtex as expected', () => {
    var text = fs.readFileSync("__tests__/data/markdown_with_bibtex.md", {encoding : "utf8"});
    var data = bibtexUtils.getUsefulData(text);

    expect(data).toEqual([
        {
          id: 'ledoit2004honey',
          bib: 'Ledoit, O., & Wolf, M. (2004). Honey, I shrunk the sample covariance matrix. The Journal of Portfolio Management, 30(4), 110–119.\n',
          citation: 'Ledoit & Wolf, 2004'
        },
        {
          id: 'lillicrap2015continuous',
          bib: 'Lillicrap, T. P., Hunt, J. J., Pritzel, A., Heess, N., Erez, T., Tassa, Y., Silver, D., & Wierstra, D. (2015). Continuous control with deep reinforcement learning. ArXiv Preprint ArXiv:1509.02971.\n',
          citation: 'Lillicrap et al., 2015'
        }
      ])
    
});