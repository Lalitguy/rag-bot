import { Link } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import BaseButton from "../components/common/BaseButton";
import Container from "../components/common/Container";

const RootIndex = () => {
  return (
    <Container centered>
      <Link href={"/(offline)"} asChild style={styles.linkStyle}>
        <BaseButton text="Offline" />
      </Link>
      <Link href={"/(rag-bot)"} asChild>
        <BaseButton text="Rag Bot" style={styles.linkStyle} />
      </Link>
    </Container>
  );
};

const styles = StyleSheet.create({
  linkStyle: {
    marginVertical: 10,
  },
});

export default RootIndex;
