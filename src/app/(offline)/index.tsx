import BaseText from "@/src/components/common/BaseText";
import Container from "@/src/components/common/Container";
import DownloadProgress from "@/src/components/common/DownloadProgress";
import ModelSelector from "@/src/components/ModelSelector";
import OfflineModelNotice from "@/src/components/OfflineModelNotice";
import RagModel from "@/src/components/RagModel";
import { useModelManager } from "@/src/hooks/useModelManager";
import { useRAGModel } from "@/src/providers/RAGModelProvider";
import { ExecuTorchLLM } from "@react-native-rag/executorch";
import React, { useEffect, useState } from "react";

const ProofOfConcept = () => {
  const { offlinePermission, models } = useRAGModel();

  const { readyModels, llms, vectorStore } = useModelManager();
  const [selectedLLM, setSelectedLLM] = useState<ExecuTorchLLM | null>(null);

  useEffect(() => {
    if (models.length) {
      setSelectedLLM(llms[models[0].id as keyof typeof llms]);
    }
  }, [llms]);

  return (
    <Container>
      {!offlinePermission && <OfflineModelNotice />}
      {offlinePermission && (!models || models.length === 0) && (
        <ModelSelector />
      )}
      {readyModels.length === 0 && selectedLLM && (
        <RagModel
          vectorStore={vectorStore}
          llm={selectedLLM}
          selectedModel={models[0]}
        />
      )}
      {/* 
      {readyModels.length > 0 &&
        models.map((model) => (
          <React.Fragment key={model.id}>
            
          </React.Fragment>
        ))} */}
    </Container>
  );
};

export default ProofOfConcept;
