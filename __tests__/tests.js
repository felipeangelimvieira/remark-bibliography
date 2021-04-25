
const fs = require("fs");
const remark = require("remark");
const parse = require("remark-parse");
const bibtexUtils = require("../src/bibliography.js");
const plugin = require("../src/index.js");
const frontmatter = require('remark-frontmatter')

test('.md output is correct with bibtex', () => {
    var text = fs.readFileSync("__tests__/data/markdown_with_bibtex.md", {encoding : "utf8"});
    const processor = remark().use(frontmatter).use(plugin);
    const refText = fs.readFileSync("__tests__/data/markdown_with_bibtex_after.md", { encoding : "utf8"});

    processor.process(text, (err, actual) => {
        if (err) {
            throw new Error(err);
        }

        var actualText = String(actual)
        expect(refText).toEqual(actualText);

    }) 
    
    
});


test('.md output is correct without bibtex', () => {
  var text = fs.readFileSync("__tests__/data/markdown_without_bibtex.md", {encoding : "utf8"});
  const processor = remark().use(frontmatter).use(plugin);
  const refText = text;

  processor.process(text, (err, actual) => {
      if (err) {
          throw new Error(err);
      }

      var actualText = String(actual)
      expect(refText).toEqual(actualText);

  }) 
  
  
});



test('parses info from bibtex as expected', () => {
    var text = fs.readFileSync("__tests__/data/bibliography.bib", {encoding : "utf8"});
    var data = bibtexUtils.parseBibliography(text);

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
