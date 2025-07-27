import { View, Text } from "react-native";
import React from "react";
import KnowledgeForm from "@/src/components/form/KnowledgeForm";
import Container from "@/src/components/common/Container";

const AddKnowledge = () => {
  return (
    <Container>
      <KnowledgeForm />
    </Container>
  );
};

export default AddKnowledge;
