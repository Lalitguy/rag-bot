import { View, Text, StyleProp, TextStyle, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "@/src/constants/colors";

interface BaseTextProps {
  text: string;
  style?: StyleProp<TextStyle>;
}
const BaseText = ({ text, style }: BaseTextProps) => {
  return <Text style={[styles.baseStyles, style]}>{text}</Text>;
};

const styles = StyleSheet.create({
  baseStyles: {
    fontSize: 14,
    color: COLORS.white,
  },
});

export default BaseText;
