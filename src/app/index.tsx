import { Link } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import BaseButton from "../components/common/BaseButton";
import Container from "../components/common/Container";
import { useNunitoFont, useFkGroteskFont } from "../hooks/useFontAsset";
import { STYLES } from "../constants/styles";
import LoadingPage from "../components/common/LoadingPage";

const RootIndex = () => {
  const loaded = useNunitoFont();
  const fkGroteskLoaded = useFkGroteskFont();
  if (!loaded || !fkGroteskLoaded) return <LoadingPage />;

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
