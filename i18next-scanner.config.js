var fs = require('fs');
var chalk = require('chalk');

module.exports = {
  input: [
    'src/**/*.{js,jsx,ts,tsx}',
    // Use ! to filter out files or directories
    '!src/**/*.spec.{js,jsx,ts,tsx}',
    '!i18n/**',
    '!**/node_modules/**',
  ],
  output: './',
  options: {
    debug: true,
    func: {
      list: ['i18next.t', 'i18n.t', 't'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    component: 'Trans',
    i18nKey: 'i18nKey',
    defaultsKey: 'defaults',
    extensions: ['.js', '.jsx'],
    fallbackKey: function (ns, value) {
      return value;
    },

    // https://react.i18next.com/latest/trans-component#usage-with-simple-html-elements-like-less-than-br-greater-than-and-others-v10.4.0
    supportBasicHtmlNodes: true, // Enables keeping the name of simple nodes (e.g. <br/>) in translations instead of indexed keys.
    keepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'], // Which nodes are allowed to be kept in translations during defaultValue generation of <Trans>.

    // https://github.com/acornjs/acorn/tree/master/acorn#interface
    acorn: {
      ecmaVersion: 2020,
      sourceType: 'module', // defaults to 'module'
    },
    lngs: ['en', 'vi'],
    ns: ['resource'],
    defaultLng: 'en',
    defaultNs: 'resource',
    defaultValue: '__STRING_NOT_TRANSLATED__',
    resource: {
      loadPath: 'i18n/{{lng}}/{{ns}}.json',
      savePath: 'i18n/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    nsSeparator: ':',
    keySeparator: '.',
    pluralSeparator: '_',
    contextSeparator: '_',
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },
  transform: function customTransform(file, enc, done) {
    'use strict';
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);

    let count = 0;

    parser.parseFuncFromString(
      content,
      {list: ['i18next._', 'i18next.__', 't', 'Trans']},
      (key, options) => {
        console.log(options);
        parser.set(
          key,
          Object.assign({}, options, {
            nsSeparator: false,
            keySeparator: false,
          }),
        );
        ++count;
      },
    );
    if (count > 0) {
      // console.log(
      // 	`i18next-scanner: count=${chalk.cyan(count)}, file=${chalk.yellow(JSON.stringify(file.relative))}`,
      // );
    }

    done();
  },
};
