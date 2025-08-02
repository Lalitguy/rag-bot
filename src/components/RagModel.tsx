import React, { useMemo } from "react";
import { Text, View } from "react-native";

import {
  ExecuTorchEmbeddings,
  ExecuTorchLLM,
} from "@react-native-rag/executorch";
import {
  ALL_MINILM_L6_V2,
  ALL_MINILM_L6_V2_TOKENIZER,
  QWEN3_0_6B_QUANTIZED,
  QWEN3_TOKENIZER,
  QWEN3_TOKENIZER_CONFIG,
} from "react-native-executorch";
import { MemoryVectorStore, useRAG } from "react-native-rag";

const RagModel = () => {
  const [downloadProgress, setDownloadProgress] = React.useState(0);

  const vectorStore = useMemo(() => {
    return new MemoryVectorStore({
      embeddings: new ExecuTorchEmbeddings({
        modelSource: ALL_MINILM_L6_V2,
        tokenizerSource: ALL_MINILM_L6_V2_TOKENIZER,
      }),
    });
  }, []);

  const llm = useMemo(() => {
    return new ExecuTorchLLM({
      modelSource: QWEN3_0_6B_QUANTIZED,
      tokenizerSource: QWEN3_TOKENIZER,
      tokenizerConfigSource: QWEN3_TOKENIZER_CONFIG,
      onDownloadProgress: setDownloadProgress,
    });
  }, []);

  const rag = useRAG({ vectorStore, llm });

  return (
    <View>
      <Text>ModelProgress</Text>
    </View>
  );
};

export default RagModel;
