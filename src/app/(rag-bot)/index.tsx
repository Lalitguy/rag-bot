import { View, Text } from "react-native";
import React from "react";
import Container from "@/src/components/common/Container";
import BaseText from "@/src/components/common/BaseText";
import { STYLES } from "@/src/constants/styles";

const RagBot = () => {
  return (
    <Container style={STYLES.justifyEnd}>
      <BaseText text="Rag Bot" />
    </Container>
  );
};

export default RagBot;
