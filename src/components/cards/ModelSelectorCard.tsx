import { COLORS } from "@/src/constants/colors";
import { ModelType } from "@/src/types";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import BaseText from "../common/BaseText";

interface ModelSelectorCardProps {
  name: ModelType["name"];
  selected?: boolean;
  onPress?: () => void;
}
const ModelSelectorCard = ({
  name,
  selected,
  onPress,
}: ModelSelectorCardProps) => {
  return (
    <TouchableOpacity
      style={[styles.card, selected ? styles.selectedCard : {}]}
      onPress={onPress}
    >
      <BaseText
        text={name}
        numberOfLines={1}
        style={[styles.textStyle, selected ? styles.selectedTextStyle : {}]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: COLORS.button,
    borderWidth: 1,
    borderRadius: 16,
    padding: 6,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8,
  },
  selectedCard: {
    backgroundColor: COLORS.button,
  },
  textStyle: {
    color: COLORS.button,
  },
  selectedTextStyle: {
    color: COLORS.dark,
  },
});
export default ModelSelectorCard;
