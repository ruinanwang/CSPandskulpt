// Generated by CoffeeScript 1.12.4
(function() {
  $(function() {
    if ($('#environment_preamble').length) {
      return CodeMirror.fromTextArea($('#environment_preamble')[0], {
        mode: {
          name: "python",
          version: 3,
          singleLineStringErrors: false
        },
        lineNumbers: true,
        gutters: ["CodeMirror-linenumbers"],
        indentUnit: 2,
        tabSize: 2,
        indentWithTabs: false,
        matchBrackets: true,
        extraKeys: {
          Tab: function(cm) {
            return cm.replaceSelection('  ', 'end');
          }
        }
      });
    }
  });

}).call(this);
