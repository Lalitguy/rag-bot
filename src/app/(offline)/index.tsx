import Container from "@/src/components/common/Container";
import ModelSelector from "@/src/components/ModelSelector";
import OfflineModelNotice from "@/src/components/OfflineModelNotice";
import { useRAGModel } from "@/src/providers/RAGModelProvider";
import React from "react";

const ProofOfConcept = () => {
  const { offlinePermission, model } = useRAGModel();
  return (
    <Container>
      {!offlinePermission && <OfflineModelNotice />}
      {offlinePermission && (!model || model.length === 0) && <ModelSelector />}
    </Container>
  );
};

export default ProofOfConcept;
