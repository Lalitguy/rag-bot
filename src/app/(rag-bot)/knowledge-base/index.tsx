import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Container from "@/src/components/common/Container";
import BaseText from "@/src/components/common/BaseText";
import BaseButton from "@/src/components/common/BaseButton";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/src/constants/colors";
import { Link, router } from "expo-router";
import AddButton from "@/src/components/animated/AddButton";

const KnowledgeList = () => {
  const handleRedirect = () => {
    router.push("/(rag-bot)/knowledge-base/add");
  };
  return (
    <Container>
      <BaseText text="Knowledge List" />
      <AddButton onPress={handleRedirect} />
    </Container>
  );
};

const styles = StyleSheet.create({
  buttonStyles: {
    position: "absolute",
    right: 12,
    bottom: 12,
    width: "50%",
  },
  btnText: {
    fontFamily: "Nunito-Bold",
  },
});

export default KnowledgeList;
