import express from 'express';
import dotenv from 'dotenv';
import connectDB from './connection/dbConnect.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';
import AuthRouter from './routes/authrouter.js';
import './models/BlacklistTokenModel.js';
import compileRoute from './routes/compile.js';
import bodyParser from 'body-parser';
import { GoogleGenAI } from "@google/genai";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api', AuthRouter);
app.use('/api', compileRoute);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', (reason) => {
    console.log(`A user disconnected (${socket.id}):`, reason);
  });

  socket.on('error', (error) => {
    console.error(`Socket error (${socket.id}):`, error.message);
  });
});

// Initialize Google GenAI with the new package
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Route to list available models
app.get("/list-models", async (req, res) => {
  try {
    res.json({ 
      models: ["gemini-2.0-flash", "gemini-1.5-pro", "gemini-1.0-pro"],
      note: "For coding challenges, gemini-2.0-flash is recommended for speed"
    });
  } catch (error) {
    console.error("Error listing models:", error);
    res.status(500).json({ error: "Failed to list models" });
  }
});

app.post("/generate-challenge", async (req, res) => {
  try {
    const { topic, difficulty = "medium" } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Please provide a topic" });
    }

    const prompt = `
    Generate a unique coding challenge about ${topic} with ${difficulty} difficulty.
    The problem should include:
    - A clear problem statement
    - A JavaScript function signature with proper parameters
    - 3-5 test cases including edge cases
    
    Return the response in strict JSON format like this:
    {
      "problem": "Problem description...",
      "function_signature": "function solution(params) {...}",
      "test_cases": [
        {"input": "...", "expected": "..."},
        {"input": "...", "expected": "...}
      ]
    }
    Only return the JSON object, no additional text or markdown.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000
      }
    });

    // Extract and clean the response
    const text = response.text;
    const cleanResponse = text.replace(/```json|```/g, '').trim();
    const challengeData = JSON.parse(cleanResponse);

    // Ensure the response contains the expected keys
    if (!challengeData.problem || !challengeData.function_signature || !challengeData.test_cases) {
      throw new Error("Invalid response format from AI model");
    }

    res.json(challengeData);
  } catch (error) {
    console.error("Error generating challenge:", error);

    let errorMessage = "Failed to generate challenge";
    if (error instanceof SyntaxError) {
      errorMessage = "Failed to parse AI response";
    } else if (error.message.includes("API key")) {
      errorMessage = "Invalid API key";
    } else if (error.message.includes("content")) {
      errorMessage = "Content generation error";
    }

    res.status(500).json({ 
      error: errorMessage,
      details: error.message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

export default server;