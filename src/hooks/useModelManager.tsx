import {
  ExecuTorchEmbeddings,
  ExecuTorchLLM,
} from "@react-native-rag/executorch";
import { useEffect, useMemo, useState } from "react";
import { MemoryVectorStore } from "react-native-rag";
import { useRagModelProvider } from "../providers/RAGModelProvider";
import { ModelType } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useModelManager() {
  const {
    models,
    updateModels,
    vectorStoreModel,
    setVectorStoreModel,
    selectedModel,
  } = useRagModelProvider();
  const [llms, setLLMs] = useState<Record<ModelType["id"], ExecuTorchLLM> | {}>(
    {}
  );
  const [readyModels, setReadyModels] = useState<ModelType[]>(
    models.filter((m) => m.isReady) || []
  );

  const vectorStore = useMemo(() => {
    return new MemoryVectorStore({
      embeddings: new ExecuTorchEmbeddings({
        modelSource: vectorStoreModel.modelSource,
        tokenizerSource: vectorStoreModel.tokenizerSource,
        onDownloadProgress: (progress: number) => {
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
    try {
      const llm = new ExecuTorchLLM({
        modelSource: model.modelSource,
        tokenizerSource: model.tokenizerSource,
        tokenizerConfigSource: model.tokenizerConfigSource,
        onDownloadProgress: (progress: number) => {
          updateModels((prev) => {
            return prev.map((m) => {
              if (m.downloadProgress === 1 || progress === 1) {
                setReadyModels((prev) => {
                  if (prev.some((model) => model.id === m.id)) {
                    return prev; // Skip adding duplicate
                  }
                  return [...prev, m];
                });
                const key = `model_ready_${m.id}`;
                AsyncStorage.getItem(key).then((val) => {
                  if (!val) AsyncStorage.setItem(key, "true");
                });
              }
              return m.id === model.id
                ? {
                    ...m,
                    downloadProgress: progress,
                    isReady: progress === 1,
                  }
                : m;
            });
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
    const initializeLLMs = async () => {
      for (const model of models) {
        await downloadModel(model);
      }
    };
    if (models && models.length > 0) {
      initializeLLMs();
    }
  }, [selectedModel]);

  return {
    vectorStore,
    readyModels,
    llms,
  };
}
