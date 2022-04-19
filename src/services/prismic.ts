import * as prismic from "@prismicio/client";
import sm from "../../sm.json";

export function getPrismicClient(req?: unknown) {
  const prismicClient = prismic.createClient(sm.apiEndpoint, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  return prismicClient;
}
