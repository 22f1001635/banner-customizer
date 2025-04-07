import js from '@eslint/js'
import vuePlugin from 'eslint-plugin-vue'
import prettierConfig from 'eslint-config-prettier'
import globals from 'globals'

export default [
  js.configs.recommended,
  ...vuePlugin.configs['flat/recommended'],
  {
    files: ['**/*.js', '**/*.vue'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        process: 'readonly',
        localStorage: 'readonly',
        FileReader: 'readonly',
        Image: 'readonly',
        setTimeout: 'readonly'
      }
    }
  },
  {
    files: ['**/*.cjs'],
    languageOptions: {
      globals: {
        ...globals.node,
        module: 'readonly'
      }
    }
  },
  {
    files: ['**/*.config.*'],
    languageOptions: {
      globals: {
        module: 'readonly'
      }
    }
  },
  {
    files: ['**/*.spec.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
        global: 'readonly',
        File: 'readonly'
      }
    }
  },
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
  },
  prettierConfig
]
