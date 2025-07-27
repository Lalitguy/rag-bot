import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Container from "@/src/components/common/Container";
import BaseText from "@/src/components/common/BaseText";
import BaseButton from "@/src/components/common/BaseButton";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/src/constants/colors";
import { Link } from "expo-router";

const KnowledgeList = () => {
  return (
    <Container>
      <BaseText text="Knowledge List" />
      <Link asChild href={"/(rag-bot)/knowledge-base/add"}>
        <BaseButton
          text="Add New"
          style={styles.buttonStyles}
          textStyle={styles.btnText}
          customComponent={
            <Ionicons
              name="add-circle-outline"
              size={20}
              color={COLORS.black}
            />
          }
        />
      </Link>
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
