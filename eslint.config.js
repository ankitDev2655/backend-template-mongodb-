// @ts-check

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
    {
        ignores: [
            'dist/**',
            'node_modules/**',
            'coverage/**',
            'logs/**'
        ]
    },

    {
        files: ['**/*.ts'],

        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommendedTypeChecked,
            eslintConfigPrettier
        ],

        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname
            },

            globals: {
                ...globals.node
            }
        },

        rules: {
            'no-console': 'error',
            'no-debugger': 'error',

            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_'
                }
            ]
        }
    }
);