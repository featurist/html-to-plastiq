var plastiq = require('plastiq');
var htmlToPlastiq = require('html-to-plastiq');
var ace = require('plastiq-ace-editor');
var h = plastiq.html;

require('brace/mode/html');
require('brace/mode/javascript');
require('brace/theme/monokai');

function render(model) {
  return h('.converter',
    ace({
        binding: [model, 'html'],
        key: 'input',
        theme: 'monokai',
        mode: 'html'
      },
      h('pre')
    ),
    ace({
        binding: {
          get: function() {
            try {
              return htmlToPlastiq(model.html)
            } catch (e) {
              console.log(e);
              return 'Invalid HTML (n.b. can only be one root element)';
            }
          },
          set: function() {}
        },
        key: 'output',
        theme: 'monokai',
        mode: 'javascript'
      },
      h('pre')
    )
  );
}

var model = { html: "<html>\n  <body>\n    <ul id=\"fruit\">\n      <li id=\"apples\" class=\"green red\">Apples</li>\n      <li title=\"nice\" class=\"orange\" tangy=\"yeah\">Oranges</li>\n    </ul>\n  </body>\n</html>" };

plastiq.append(document.body, render, model);
