import { GoogleGenAI } from "@google/genai";
import readFileSync from "readline-sync";
import dotenv from "dotenv";
dotenv.config();

const historyChat = [];

const ai = new GoogleGenAI({
  //use google gen ai key of free version done
  apiKey: process.env.LLM_API_KEY,
});

const chat = ai.chats.create({
  model: "gemini-2.5-flash",
  history: [],
});

async function myChattingApp(userProblem) {
  //creating the chat history from the userSide;
  historyChat.push({
    role: "user",
    parts: [{ text: userProblem }],
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: historyChat,
  });

  historyChat.push({
    role: "model",
    parts: [{ ...response, text: response.text }],
  });
  console.log(response.text);
}

async function main() {
  // this is the readfile sync for continious input chat integration
  const myQuestion = readFileSync.question("tell me your doubts->");
  const response = await chat.sendMessage({
    message: myQuestion,
  });
  console.log(response.text);
  main();
}

await main();
