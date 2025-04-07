const YamatoDaiwaStyleGuides = require("@yamato-daiwa/style_guides/ECMAScript");


module.exports = [

  {
    ignores: [
      "Distributable/*"
    ]
  },

  ...YamatoDaiwaStyleGuides,

  {
    languageOptions: {
      parserOptions: {
        project: "tsconfig.eslint.json"
      }
    }
  },

  {
    files: [ "Tests/Manual/**/*.ts", "Documentation/**/*.ts" ],
    rules: {

      /* Need some feedback for non-production examples. */
      "no-console": "off"

    }
  },

  {

    files: [
      "Tests/Manual/**/BusinessRules/**/*.ts"
    ],

    rules: {

      /* Need to merge type and namespace that is completely valid TypeScript */
      "@typescript-eslint/no-redeclare": "off",

      /* No problem will occur while invoke the properties by full qualified name */
      "@typescript-eslint/no-shadow": "off"

    }

  }

];
