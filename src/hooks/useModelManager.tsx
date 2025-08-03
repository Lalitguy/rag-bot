import { useState, useEffect } from "react";
import { ExecuTorchLLM } from "@react-native-rag/executorch";
import { ModelType } from "../types";

export function useModelManager(initialModes: ModelType[]) {
  const [modes, setModes] = useState<ModelType[]>(initialModes);
  const [activeModeId, setActiveModeId] = useState(initialModes[0].id);
  const [llms, setLLMs] = useState<Record<string, ExecuTorchLLM>>({});

  useEffect(() => {
    const initializeLLMs = async () => {
      const newLLMs: Record<string, ExecuTorchLLM> = {};

      for (const mode of initialModes) {
        const llm = new ExecuTorchLLM({
          modelSource: mode.modelSource,
          tokenizerSource: mode.tokenizerSource,
          tokenizerConfigSource: mode.tokenizerConfigSource,
          onDownloadProgress: (progress: number) => {
            setModes((prevModes) =>
              prevModes.map((m) =>
                m.id === mode.id ? { ...m, downloadProgress: progress } : m
              )
            );
          },
        });

        await llm.load(); // or wait until downloaded
        newLLMs[mode.id] = llm;

        setModes((prevModes) =>
          prevModes.map((m) => (m.id === mode.id ? { ...m, isReady: true } : m))
        );
      }

      setLLMs(newLLMs);
    };

    initializeLLMs();
  }, []);

  return {
    modes,
    activeMode: modes.find((m) => m.id === activeModeId),
    setActiveModeId,
    activeLLM: llms[activeModeId],
    allLLMs: llms,
  };
}
