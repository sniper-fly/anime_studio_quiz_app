import "@/styles/globals.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { GameModeProvider } from "@/components/GameModeContext";

export const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <GameModeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GameModeProvider>
    </ApolloProvider>
  );
}
