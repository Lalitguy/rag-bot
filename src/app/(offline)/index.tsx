import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { useRAG, MemoryVectorStore } from "react-native-rag";
import {
  ALL_MINILM_L6_V2,
  ALL_MINILM_L6_V2_TOKENIZER,
  LLAMA3_2_1B_QLORA,
  LLAMA3_2_1B_TOKENIZER,
  LLAMA3_2_TOKENIZER_CONFIG,
} from "react-native-executorch";
import {
  ExecuTorchEmbeddings,
  ExecuTorchLLM,
} from "@react-native-rag/executorch";

const vectorStore = new MemoryVectorStore({
  embeddings: new ExecuTorchEmbeddings({
    modelSource: ALL_MINILM_L6_V2,
    tokenizerSource: ALL_MINILM_L6_V2_TOKENIZER,
  }),
});

const llm = new ExecuTorchLLM({
  modelSource: LLAMA3_2_1B_QLORA,
  tokenizerSource: LLAMA3_2_1B_TOKENIZER,
  tokenizerConfigSource: LLAMA3_2_TOKENIZER_CONFIG,
});

const TabOneScreen = () => {
  const rag = useRAG({ vectorStore, llm });

  const init = async () => {
    // 1. Add documents to knowledge base
    await rag.addDocument("React Native is a mobile framework");
    await rag.addDocument("JavaScript is a programming language");

    // 2. Ask questions
    await rag.generate("What is React Native?");
  };

  useEffect(() => {
    console.log("rag is not ready");
    if (!rag.isReady) return;

    console.log("RAG is ready");
    init();
  }, [rag.isReady]);

  if (rag.error) {
    console.log("rag error", rag.error);
    return <Text>{rag.error}</Text>;
  }

  // useEffect(() => {
  //   console.log(rag);
  // }, [rag]);

  if (!rag.isReady) {
    console.log(rag);
    return <Text>Loading...</Text>;
  }
  return (
    <View>
      <Text>Hellow world</Text>
      <Text>React Native is a mobile framework</Text>
      <Text>{rag.isReady}</Text>
    </View>
  );
};

export default TabOneScreen;
