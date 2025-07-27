import { Link } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import BaseButton from "../components/common/BaseButton";
import Container from "../components/common/Container";
import { useNunitoFont } from "../hooks/useNunitoFont";
import { STYLES } from "../constants/styles";

const RootIndex = () => {
  const loaded = useNunitoFont();
  if (!loaded) return null;

  return (
    <Container centered>
      <Link href={"/(offline)"} asChild style={styles.linkStyle}>
        <BaseButton text="Offline" textStyle={STYLES.textSemiBold} />
      </Link>
      <Link href={"/(rag-bot)"} asChild>
        <BaseButton
          text="Rag Bot"
          style={styles.linkStyle}
          textStyle={STYLES.textSemiBold}
        />
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
