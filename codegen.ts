import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://graphql.anilist.co",
  documents: ["pages/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "graphql/**/*.{ts}"],
  generates: {
    "./graphql/": {
      plugins: [],
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
