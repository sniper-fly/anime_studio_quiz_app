import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://graphql.anilist.co",
  generates: {
    "./graphql/": {
      plugins: ["typescript"],
      preset: "client",
    },
  },
};

export default config;
