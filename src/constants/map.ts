import {
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
import { ModelType } from "../types";

export const ModelMap: ModelType[] = [
  {
    id: "qwen3",
    name: "Qwen3 (Recommended)",
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
    name: "Ilama-3.2 - QLoRa",
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
    name: "SmolLm2.1 - Quantized",
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
