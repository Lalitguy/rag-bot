import {
  View,
  Text,
  TextInput,
  StyleProp,
  TextStyle,
  StyleSheet,
} from "react-native";
import React, { useMemo, useState } from "react";
import { COLORS } from "@/src/constants/colors";
import BaseText from "./BaseText";

interface Props {
  style?: StyleProp<TextStyle>;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  label?: string;
  numberOfLines?: number;
}
const BaseInput = ({ style, label, numberOfLines = 1, ...props }: Props) => {
  const heightStyle = useMemo(() => {
    return {
      minHeight: 14 * numberOfLines + 28,
      maxHeight: 14 * 20 + 28,
    };
  }, [numberOfLines]);
  return (
    <View style={styles.groupWrap}>
      {label && <BaseText text={label} style={styles.labelStyle} />}
      <TextInput
        style={[styles.baseStyles, style, heightStyle]}
        multiline={numberOfLines > 1}
        placeholderTextColor={COLORS.gray}
        textAlignVertical="top"
        numberOfLines={numberOfLines}
        selectionColor={COLORS.white}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  groupWrap: {
    gap: 8,
    marginBottom: 20,
  },
  baseStyles: {
    backgroundColor: COLORS.darkTertiary,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 14,
    color: COLORS.white,
    fontFamily: "Nunito",
  },
  labelStyle: {
    fontFamily: "Nunito-Semi",
    color: COLORS.white,
    letterSpacing: 0.9,
  },
});
export default BaseInput;
