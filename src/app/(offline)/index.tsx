import Container from "@/src/components/common/Container";
import OfflineModelNotice from "@/src/components/OfflineModelNotice";
import { useRAGModel } from "@/src/providers/RAGModelProvider";
import React from "react";

const ProofOfConcept = () => {
  const { offlinePermission } = useRAGModel();
  return <Container>{!offlinePermission && <OfflineModelNotice />}</Container>;
};

export default ProofOfConcept;
