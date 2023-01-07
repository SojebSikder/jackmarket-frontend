// server base url
// const URL = "http://localhost:8000";
const URL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://127.0.0.1:8000";
// app config
export const AppConfig = {
  // api endpoint
  apiUrl: `${URL}/api`,
  // basic info
  appName: "Site name",
  /**
   * Payment
   */
  // stripe
  stripe_publishable_key: `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`,
};
