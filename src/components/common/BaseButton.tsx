import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React from "react";
import BaseText from "./BaseText";
import { COLORS } from "@/src/constants/colors";

interface BaseButtonProps {
  text?: string;
  onPress?: () => void;
  customComponent?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const BaseButton = ({
  text,
  onPress,
  customComponent,
  style = {},
  textStyle = {},
}: BaseButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.baseStyles, style]}>
      {customComponent ? customComponent : null}
      {text && <BaseText text={text} style={[styles.textStyles, textStyle]} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseStyles: {
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    paddingHorizontal: 16,
    width: "80%",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  textStyles: {
    textAlign: "center",
    color: COLORS.black,
  },
});

export default BaseButton;
