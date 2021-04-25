# Remark bibliography html

A remark plugin that transforms bibtex entry into a html list and citations into anchor tags.

:construction_worker: :warning: This plugin will be updated soon :)


## Usage

1. Write down the bibtex entries  between `<bibliograpy></bibliography>` tags anywhere in your markdown document. Each entry will be translated to `<li> </li>` components, wrapped in a div of class "references".

2. Cite using `@ref{youreferenceid}`.

## Example

This 

```md

---
title: titulo
author: autor
---

# This is the first header

Some text, lorem ipsum. I can cite @ref{ledoit2004honey} and others.

<bibliography>
@article{ledoit2004honey,
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
}
</bibliography>

```
will be translated to:

```md
***

## title: titulo&#xA;author: autor

# This is the first header

Some text, lorem ipsum. I can cite <span class="citation" data-cites="ledoit2004honey">
    <a href="ref-ledoit2004honey">Ledoit & Wolf, 2004</a>
    </span> and others.

<div id="references">

<li id="ref-ledoit2004honey" class="csl-entry"> Ledoit, O., & Wolf, M. (2004). Honey, I shrunk the sample covariance matrix. The Journal of Portfolio Management, 30(4), 110–119.
</li>

<li id="ref-lillicrap2015continuous" class="csl-entry"> Lillicrap, T. P., Hunt, J. J., Pritzel, A., Heess, N., Erez, T., Tassa, Y., Silver, D., & Wierstra, D. (2015). Continuous control with deep reinforcement learning. ArXiv Preprint ArXiv:1509.02971.
</li>

</div>

```
## Contribute

Feel free to contribute and submit pull requests.
