import { View, Text } from "react-native";
import React from "react";
import Container from "./Container";
import BaseText from "./BaseText";

const LoadingPage = () => {
  return (
    <Container centered>
      <BaseText text="Loading..." />
    </Container>
  );
};

export default LoadingPage;
