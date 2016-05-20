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
              return '';
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

var model = { html: '' };

plastiq.append(document.body, render, model);
