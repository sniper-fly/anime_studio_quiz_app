import { Medium } from "./Medium";

export type GameProps = {
  query: any;
  queryParams?: any;
  extractMedium: (data: any) => Medium | null | undefined;
};
