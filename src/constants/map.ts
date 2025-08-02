import { ModelType } from "../types";

export const ModelMap = [
  {
    id: "qwen3" as ModelType,
    name: "Qwen3 (Recommended)",
    description:
      "Compact LLM - Fast, cost-efficient inference, good at reasoning. Focus on small model size with high quality.",
    modelSize: "944 MB (0.6B)",
  },
  {
    id: "ilama3" as ModelType,
    name: "Ilama-3.2 - QLoRa",
    description:
      "Lightweight Model fine-tuned with QLoRA for efficient, private, offline language understanding tasks.",
    modelSize: "1.18 GB (1B)",
  },
  {
    id: "smollm2" as ModelType,
    name: "SmolLm2.1 - Quantized",
    description:
      "Compact and Quantized model for fast, private, on-device language understanding and search.",
    modelSize: "1.31 GB (1.7B)",
  },
];
