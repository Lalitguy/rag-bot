import {
  ExecuTorchEmbeddings,
  ExecuTorchLLM,
} from "@react-native-rag/executorch";
import { useEffect, useMemo, useState } from "react";
import { MemoryVectorStore } from "react-native-rag";
import { useRAGModel } from "../providers/RAGModelProvider";
import { ModelType } from "../types";

export function useModelManager() {
  const {
    models,
    updateModels,
    vectorStoreModel,
    setVectorStoreModel,
    selectedModel,
  } = useRAGModel();
  const [llms, setLLMs] = useState<Record<ModelType["id"], ExecuTorchLLM> | {}>(
    {}
  );

  const vectorStore = useMemo(() => {
    return new MemoryVectorStore({
      embeddings: new ExecuTorchEmbeddings({
        modelSource: vectorStoreModel.modelSource,
        tokenizerSource: vectorStoreModel.tokenizerSource,
        onDownloadProgress: (progress: number) => {
          // console.log("Vector store download progress:", progress);
          setVectorStoreModel((prev) => ({
            ...prev,
            downloadProgress: progress,
            isReady: progress === 1,
          }));
        },
      }),
    });
  }, []);

  async function downloadModel(model: ModelType) {
    const isAlreadyReady = models.find((m) => m.id === model.id)?.isReady;

    if (isAlreadyReady) return;

    try {
      const llm = new ExecuTorchLLM({
        modelSource: model.modelSource,
        tokenizerSource: model.tokenizerSource,
        tokenizerConfigSource: model.tokenizerConfigSource,
        onDownloadProgress: (progress: number) => {
          console.log("progress", progress);
          updateModels((prev) => {
            return prev.map((m) =>
              m.id === model.id
                ? {
                    ...m,
                    downloadProgress: progress,
                    isReady: progress === 1,
                  }
                : m
            );
          });
        },
      });
      setLLMs((prev) => ({
        ...(prev ?? {}),
        [model.id as keyof typeof llms]: llm,
      }));
    } catch (error) {
      console.error(`Error initializing model ${model.id}:`, error);
      return;
    }
  }

  useEffect(() => {
    console.log("detected change");
    const initializeLLMs = async () => {
      // await Promise.all(models.map((mode) => downloadModel(mode)));
      for (const model of models) {
        await downloadModel(model);
      }
    };
    if (models && models.length > 0) {
      initializeLLMs().catch(console.error);
    }
  }, [selectedModel]);

  const readyModels = models?.filter((m) => m.isReady) ?? [];

  return {
    vectorStore,
    readyModels,
    llms,
  };
}
