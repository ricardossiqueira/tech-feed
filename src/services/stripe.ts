import Stripe from "stripe";
import Package from "../../package.json";

export const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2020-08-27",
  appInfo: {
    name: "tech.news",
    version: Package.version,
  },
});
