import { useState, useEffect, use } from "react";
import { ExecuTorchLLM } from "@react-native-rag/executorch";
import { ModelType } from "../types";
import { useRAGModel } from "../providers/RAGModelProvider";

export function useModelManager() {
  const { models, updateModels } = useRAGModel();
  const [llms, setLLMs] = useState<Record<ModelType["id"], ExecuTorchLLM> | {}>(
    {}
  );

  async function downloadModel(model: ModelType) {
    const isAlreadyReady = models.find((m) => m.id === model.id)?.isReady;

    if (isAlreadyReady) return;

    const llm = new ExecuTorchLLM({
      modelSource: model.modelSource,
      tokenizerSource: model.tokenizerSource,
      tokenizerConfigSource: model.tokenizerConfigSource,
      onDownloadProgress: (progress: number) => {
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

    await llm.load();

    setLLMs((prev) => ({
      ...(prev ?? {}),
      [model.id]: llm,
    }));
  }

  useEffect(() => {
    const initializeLLMs = async () => {
      // await Promise.all(models.map((mode) => downloadModel(mode)));
      for (const model of models) {
        await downloadModel(model);
      }
    };
    if (models && models.length > 0) {
      initializeLLMs().catch(console.error);
    }
  }, [models]);

  const readyModels = models?.filter((m) => m.isReady) ?? [];

  return {
    readyModels,
    llms,
  };
}
