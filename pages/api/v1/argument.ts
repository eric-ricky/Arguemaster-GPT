// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
// import { PostgrestError, createClient } from "@supabase/supabase-js";
import GPT3Tokenizer from "gpt3-tokenizer";
import { oneLine, stripIndent } from "common-tags";

type Data = {
  success: boolean;
  error?: string;
  data?: {
    id: string;
    choices: {
      text: string | undefined;
    }[];
  };
};

// initializing supabase client
// const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL || "";
// const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
// const supabase = createClient(projectUrl, anonKey);

// initializing openai
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: "Something went wrong. Please contact support for help.",
      success: false,
    });
    return;
  }

  // getting question and history
  const { issue, position } = req.body;

  // checking if there is question
  if (!issue || !position) {
    res.status(400).json({
      error: "Your input doesn't look right. Try again.",
      success: false,
    });
    return;
  }

  try {
    const tokenizer = new GPT3Tokenizer({ type: "gpt3" });

    console.log("Tokenizing the topic...");
    const issueToken = tokenizer.encode(issue).text.length;
    console.log("Issue token ===>", issueToken);
    if (issueToken > 70) {
      res.status(400).json({
        error: "Issue is too long! Try making it short.",
        success: false,
      });
      return;
    }

    console.log("Tokenizing the position...");
    const positionToken = tokenizer.encode(issue).text.length;
    console.log("Position token ===>", positionToken);
    if (positionToken > 70) {
      res.status(400).json({
        error: "Position is too long! Try making it short.",
        success: false,
      });
      return;
    }

    // create prompt (system statement, relevant docs, question)
    const prompt = stripIndent`${oneLine`I am involved in a discussion about (topic: ${issue}). Please help me uncover the most powerful argument in favor of my position (position: ${position}) by providing a well-structured, persuasive, and data-driven argument. Rules you must follow strictly: 1. Do not repeat the prompt, just return the response in the following structure(up to 2 points max):`}
    1. point
    2. point`;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 512,
      temperature: 0,
    });

    const {
      id,
      choices: [{ text }],
    } = response.data;
    const data = {
      id,
      choices: [{ text }],
    };

    console.log("Success 🎉");

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log("ERROR ===>", error);
    res.status(500).json({
      error: "Something went wrong! Try again later.",
      success: false,
    });
  }
}
