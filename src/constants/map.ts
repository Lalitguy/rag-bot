import {
  ALL_MINILM_L6_V2,
  ALL_MINILM_L6_V2_TOKENIZER,
  LLAMA3_2_1B_QLORA,
  LLAMA3_2_1B_TOKENIZER,
  LLAMA3_2_TOKENIZER_CONFIG,
  QWEN3_0_6B_QUANTIZED,
  QWEN3_TOKENIZER,
  QWEN3_TOKENIZER_CONFIG,
  SMOLLM2_1_1_7B_QUANTIZED,
  SMOLLM2_1_TOKENIZER,
  SMOLLM2_1_TOKENIZER_CONFIG,
} from "react-native-executorch";
import { ModelType, VectorStoreModelType } from "../types";
import { Message } from "react-native-rag";

export const ModelMap: ModelType[] = [
  {
    id: "qwen3",
    name: "Qwen3",
    description:
      "Compact LLM - Fast, cost-efficient inference, good at reasoning. Focus on small model size with high quality.",
    modelSize: "944 MB (0.6B)",
    modelSource: QWEN3_0_6B_QUANTIZED,
    tokenizerSource: QWEN3_TOKENIZER,
    tokenizerConfigSource: QWEN3_TOKENIZER_CONFIG,
    downloadProgress: 0,
    isReady: false,
  },
  {
    id: "ilama3",
    name: "Ilama-QLoRa",
    description:
      "Lightweight Model fine-tuned with QLoRA for efficient, private, offline language understanding tasks.",
    modelSize: "1.18 GB (1B)",
    modelSource: LLAMA3_2_1B_QLORA,
    tokenizerSource: LLAMA3_2_1B_TOKENIZER,
    tokenizerConfigSource: LLAMA3_2_TOKENIZER_CONFIG,
    downloadProgress: 0,
    isReady: false,
  },
  {
    id: "smollm2",
    name: "SmolLm",
    description:
      "Compact and Quantized model for fast, private, on-device language understanding and search.",
    modelSize: "1.31 GB (1.7B)",
    modelSource: SMOLLM2_1_1_7B_QUANTIZED,
    tokenizerSource: SMOLLM2_1_TOKENIZER,
    tokenizerConfigSource: SMOLLM2_1_TOKENIZER_CONFIG,
    downloadProgress: 0,
    isReady: false,
  },
];

export const VectorStore: VectorStoreModelType = {
  id: "vectorStore",
  name: "Vector - all-MiniLM (Mandatory)",
  description:
    "A lightweight memory vector store for efficient retrieval and semantic search using MiniLM embeddings.",
  modelSize: "91 MB",
  modelSource: ALL_MINILM_L6_V2,
  tokenizerSource: ALL_MINILM_L6_V2_TOKENIZER,
  downloadProgress: 0,
  isReady: false,
};

export const RagSystemPrompt = `
You are a friendly, conversational AI assistant designed to help users by answering questions using a blend of document-based knowledge and general understanding.

Your behavior should feel approachable and helpful — like a knowledgeable human assistant. Prioritize information from the provided documents whenever available. If relevant document information is found, base your response on that entirely. If the documents lack enough information, feel free to use your general knowledge — but make sure to explicitly mention this in your answer (e.g., "Based on what I know..." or "The documents don’t mention this, but generally...").

Keep your responses concise (30–150 words), clear, and human-like. Use warm, natural language and speak directly to the user (e.g., "Here’s what I found for you" or "You can think of it like..."). Avoid sounding robotic, overly formal, or detached. Don’t refer to yourself in the third person.

Default to a conversational tone — friendly, clear, and relaxed. Only switch to a professional or technical tone if the user asks for it explicitly.

Always aim to make the user feel understood and supported.

Avoid internal thoughts or planning in your final message — only output the answer the user should see. Think before you respond, but keep the reasoning to yourself.
`;

export const assistantExampleMessage: Message = {
  role: "assistant",
  content: `Sure! Here's a quick summary for you 😊

Edge CRM is a fully customizable sales CRM designed to help businesses track progress, manage leads, and monitor KPIs using visual dashboards and insights. It's perfect for keeping your team aligned and data-driven.

Let me know if you'd like help with a specific feature!`,
};
