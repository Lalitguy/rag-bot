import { View, Text, StyleProp, TextStyle, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "@/src/constants/colors";

interface BaseTextProps {
  text: string;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}
const BaseText = ({ text, style, numberOfLines }: BaseTextProps) => {
  return (
    <Text style={[styles.baseStyles, style]} numberOfLines={numberOfLines}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  baseStyles: {
    fontSize: 14,
    color: COLORS.white,
    fontFamily: "Nunito",
    includeFontPadding: false,
  },
});

export default BaseText;
