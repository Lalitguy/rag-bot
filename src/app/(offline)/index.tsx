import BaseText from "@/src/components/common/BaseText";
import Container from "@/src/components/common/Container";
import ModelSelector from "@/src/components/ModelSelector";
import OfflineModelNotice from "@/src/components/OfflineModelNotice";
import { useModelManager } from "@/src/hooks/useModelManager";
import { useRAGModel } from "@/src/providers/RAGModelProvider";
import React from "react";

const ProofOfConcept = () => {
  const { offlinePermission, models } = useRAGModel();

  const { readyModels, llms } = useModelManager();
  return (
    <Container>
      {!offlinePermission && <OfflineModelNotice />}
      {offlinePermission && (!models || models.length === 0) && (
        <ModelSelector />
      )}
      {offlinePermission &&
        models &&
        models.length > 0 &&
        models.map((mode) => (
          <BaseText
            key={mode.id}
            text={`Model: ${mode.name}, Size: ${mode.modelSize}, progress: ${mode.downloadProgress}%`}
            style={{ marginVertical: 10 }}
          />
        ))}

      {readyModels.length > 0 &&
        models.map((model) => (
          <BaseText
            key={model.id}
            text={`Model: ${model.name} - ${model.downloadProgress}%`}
          />
        ))}
    </Container>
  );
};

export default ProofOfConcept;
