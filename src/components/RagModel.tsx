import React from "react";
import { Text, View } from "react-native";

import { ExecuTorchLLM } from "@react-native-rag/executorch";
import { MemoryVectorStore, useRAG } from "react-native-rag";
import DownloadProgress from "./common/DownloadProgress";
import { ModelType } from "../types";
import BaseText from "./common/BaseText";
import { useRagModelProvider } from "../providers/RAGModelProvider";
import { useModelManager } from "../hooks/useModelManager";
import RagChat from "./RagChat";

interface RagModelProps {
  vectorStore: MemoryVectorStore;
  llm: ExecuTorchLLM;
  selectedModel: ModelType;
}

const RagModel = ({ vectorStore, llm, selectedModel }: RagModelProps) => {
  const { vectorStoreModel } = useRagModelProvider();
  const { readyModels } = useModelManager();
  const rag = useRAG({ vectorStore, llm });

  if (!rag.isReady && readyModels.length === 0) {
    return (
      <>
        {vectorStoreModel.downloadProgress < 1 && (
          <DownloadProgress
            progress={vectorStoreModel.downloadProgress}
            text="Downloading Vector Store"
          />
        )}
        <DownloadProgress
          progress={selectedModel.downloadProgress}
          text={`Downloading ${selectedModel.name}`}
        />
      </>
    );
  }

  if (rag.error) {
    console.error("RAG Error:", rag.error);
    return <BaseText text={`Error: ${rag.error}`} />;
  }

  return <RagChat rag={rag} />;
};

export default RagModel;
