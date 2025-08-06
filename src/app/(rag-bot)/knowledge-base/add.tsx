import { View, Text, StyleSheet } from "react-native";
import React from "react";
import KnowledgeForm from "@/src/components/form/KnowledgeForm";
import Container from "@/src/components/common/Container";
import { STYLES } from "@/src/constants/styles";

const AddKnowledge = () => {
  return (
    <Container style={STYLES.bgTertiary}>
      <KnowledgeForm />
    </Container>
  );
};

export default AddKnowledge;
