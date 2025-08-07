import { View, Text, StyleProp, TextStyle, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "@/src/constants/colors";

interface BaseTextProps {
  text: string;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  selectable?: boolean;
}
const BaseText = ({
  text,
  style,
  numberOfLines,
  selectable,
}: BaseTextProps) => {
  return (
    <Text
      style={[styles.baseStyles, style]}
      numberOfLines={numberOfLines}
      selectable={selectable}
    >
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
