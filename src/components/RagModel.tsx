import React from "react";
import { Text, View } from "react-native";

import { ExecuTorchLLM } from "@react-native-rag/executorch";
import { MemoryVectorStore, useRAG } from "react-native-rag";
import DownloadProgress from "./common/DownloadProgress";
import { ModelType } from "../types";
import BaseText from "./common/BaseText";
import { useRAGModel } from "../providers/RAGModelProvider";

interface RagModelProps {
  vectorStore: MemoryVectorStore;
  llm: ExecuTorchLLM;
  selectedModel: ModelType;
}

const RagModel = ({ vectorStore, llm, selectedModel }: RagModelProps) => {
  const { vectorStoreModel } = useRAGModel();
  const rag = useRAG({ vectorStore, llm });

  if (!rag.isReady) {
    return (
      <>
        {vectorStoreModel.downloadProgress < 1 && (
          <>
            <BaseText text={`Downloading Vector Store`} />
            <DownloadProgress progress={vectorStoreModel.downloadProgress} />
          </>
        )}
        <BaseText
          text={`Downloading ${selectedModel.name.replace(
            "(Recommended)",
            ""
          )} - ${
            selectedModel.downloadProgress === 0
              ? "(in queue)"
              : `${selectedModel.downloadProgress}%`
          }`}
        />
        <DownloadProgress progress={selectedModel.downloadProgress} />
      </>
    );
  }

  return (
    <View>
      <Text>ModelProgress</Text>
    </View>
  );
};

export default RagModel;
