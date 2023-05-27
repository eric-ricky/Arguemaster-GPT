// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import configuration from "@/lib/openaiConfig";
import { oneLine, stripIndent } from "common-tags";
import GPT3Tokenizer from "gpt3-tokenizer";
import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAIApi } from "openai";

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

// initializing openai
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!configuration.apiKey) {
    // fake error response 😅😅
    res.status(500).json({
      error:
        "Sorry😢, we are at capacity right now, and working to scale our servers. Please try again later.",
      success: false,
    });
    return;
  }

  // getting issue and position
  const { issue, position } = req.body;

  // checking position and issues are empty
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
    const prompt = stripIndent`${oneLine`I am involved in a discussion about (topic: ${issue}). Please help me uncover the most powerful argument in favor of my position (position: ${position}). Provide a well-structured, persuasive, and data-driven argument. Rules you must follow strictly: 1. Do not repeat the prompt, just return the response in the following structure(up to 2 points max):`}
    Point 1: point
    Point 2: point`;

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
