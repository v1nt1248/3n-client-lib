import eslintJs from '@eslint/js';
import tsEslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';
import pluginVue from 'eslint-plugin-vue';
import pluginTsEslint from '@typescript-eslint/eslint-plugin';
import pluginPrettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  eslintJs.configs['recommended'],
  ...tsEslint.configs['recommended'],
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    plugins: {
      '@typescript-eslint': pluginTsEslint,
      prettier: pluginPrettier,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
          modules: true,
          experimentalObjectRestSpread: true,
        },
      },
    },
    rules: {
      'max-len': [
        'error',
        {
          code: 115,
          ignoreComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      'no-console': 'off',
      'no-debugger': 'off',
      'no-undef': 'off',
      'default-case': ['error'],
      'import/prefer-default-export': 'off',
      'lines-between-class-members': 'off',
      'no-param-reassign': 'off',
      'no-return-assign': 'off',
      'arrow-parens': ['error', 'as-needed'],
      'curly': 'error',
      'object-curly-newline': [
        'error',
        {
          consistent: true,
        },
      ],

      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/no-inferrable-types': [
        'error',
        {
          ignoreProperties: false,
          ignoreParameters: false,
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    },
  },

  ...pluginVue.configs['flat/base'],
  ...pluginVue.configs['flat/essential'],
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['*.vue', '**/*.vue'],
    plugins: {
      '@typescript-eslint': pluginTsEslint,
      prettier: pluginPrettier,
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
          modules: true,
          experimentalObjectRestSpread: true,
        },
      },
    },
    rules: {
      'no-undef': 'off',
      'no-unsafe-optional-chaining': ['error'],

      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/no-inferrable-types': [
        'error',
        {
          ignoreProperties: false,
          ignoreParameters: false,
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],

      'vue/no-v-model-argument': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-duplicate-attributes': [
        'error',
        {
          allowCoexistClass: true,
          allowCoexistStyle: true,
        },
      ],
      'vue/html-self-closing': ['error', {
        html: {
          void: 'any',
        },
      }],
    },
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  {
    files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },

  {
    ignores: [
      '**/@types/**/*.*',
      '**/ci/**/*.*',
      '**/docs/**/*.*',
      '**/public/**/*.*',
      '**/src/demo/**/*.*',
      '**/src/utils/sqlite-on-3nstorage/**/*.*',
    ],
  },
];
