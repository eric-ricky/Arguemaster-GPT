import { Configuration } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY || "",
});

export default configuration;
