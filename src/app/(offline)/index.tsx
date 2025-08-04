import BaseText from "@/src/components/common/BaseText";
import Container from "@/src/components/common/Container";
import ModelSelector from "@/src/components/ModelSelector";
import OfflineModelNotice from "@/src/components/OfflineModelNotice";
import RagModel from "@/src/components/RagModel";
import { useModelManager } from "@/src/hooks/useModelManager";
import { useRagModelProvider } from "@/src/providers/RAGModelProvider";
import { ExecuTorchLLM } from "@react-native-rag/executorch";
import React, { useEffect, useState } from "react";

const ProofOfConcept = () => {
  const { offlinePermission, models } = useRagModelProvider();

  const { llms, vectorStore } = useModelManager();
  const [selectedLLM, setSelectedLLM] = useState<ExecuTorchLLM | null>(null);

  useEffect(() => {
    if (models.length) {
      setSelectedLLM(llms[models[0].id as keyof typeof llms]);
    }
  }, [llms]);

  return (
    <Container noPadding>
      {!offlinePermission && <OfflineModelNotice />}
      {offlinePermission && (!models || models.length === 0) && (
        <ModelSelector />
      )}
      {selectedLLM && (
        <RagModel
          vectorStore={vectorStore}
          llm={selectedLLM}
          selectedModel={
            models.find((m) => m.modelSource === selectedLLM) || models[0]
          }
        />
      )}
      {/* {models.length > 0 &&
        models.map((model) => <BaseText key={model.id} text={model.name} />)} */}
    </Container>
  );
};

export default ProofOfConcept;
