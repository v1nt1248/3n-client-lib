module.exports = {
  plugins: ['stylelint-scss'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue',
  ],
  ignoreFiles: ['/app/assets/**/*.css'],

  rules: {
    'length-zero-no-unit': null,
    'at-rule-empty-line-before': ['always', {
      ignore: ['after-comment'],
      ignoreAtRules: ['mixin'],
      except: [
        'inside-block',
        'after-same-name',
      ],
    }],
    'no-empty-source': null,
    'no-descending-specificity': null,
    'color-function-notation': null,
    'selector-class-pattern': null,
    'alpha-value-notation': 'number',
    'import-notation': 'string',
    'media-feature-name-no-unknown': [
      true,
      {
        'ignoreMediaFeatureNames': [
          '/^prefers-/',
        ],
      },
    ],
    'value-keyword-case': null,
    'at-rule-no-unknown': [
      true,
      {
        'ignoreAtRules': [
          'include',
          'function',
          'return',
          'mixin',
          'if',
          'else',
          'for',
          'extend',
          'each',
          'content',
          'use',
          'font-feature-values',
          'character-variant',
          'styleset',
        ],
      },
    ],
    'at-rule-descriptor-no-unknown': [
      true,
      {
        'ignoreDescriptors': {
          'font-feature-values': [
            'character-variant',
            'styleset',
            'swash',
            'ornaments',
            'annotation',
          ],
        },
      },
    ],
    'property-no-unknown': [
      true,
      {
        'ignoreSelectors': ['/.*Inter.*/'],
        'ignoreAtRules': [
          'font-feature-values',
          'character-variant',
          'styleset',
        ],
      },
    ],
    'shorthand-property-no-redundant-values': null,
    'declaration-property-value-no-unknown': null,
  },
};
