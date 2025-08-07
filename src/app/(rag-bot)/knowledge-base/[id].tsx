import { useKnowledgeId } from "@/src/api/knowledge";
import BaseText from "@/src/components/common/BaseText";
import Container from "@/src/components/common/Container";
import LoadingPage from "@/src/components/common/LoadingPage";
import KnowledgeForm from "@/src/components/form/KnowledgeForm";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const KnowledgeEdit = () => {
  const { id } = useLocalSearchParams();

  const { data: res, isPending } = useKnowledgeId(String(id));

  if (isPending) return <LoadingPage />;

  const { data: knowledge } = res || {};

  return (
    <Container>
      <KnowledgeForm formValues={knowledge} updateId={id.toString()} />
    </Container>
  );
};

export default KnowledgeEdit;
