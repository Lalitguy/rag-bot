import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  KeyboardAvoidingViewBase,
} from "react-native";
import React from "react";
import Container from "@/src/components/common/Container";
import BaseText from "@/src/components/common/BaseText";
import { STYLES } from "@/src/constants/styles";
import BaseInput from "@/src/components/common/BaseInput";
import { COLORS } from "@/src/constants/colors";
import BaseButton from "@/src/components/common/BaseButton";
import { AntDesign, EvilIcons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const RagBot = () => {
  return (
    <Container style={STYLES.justifyEnd} noPadding>
      <KeyboardAvoidingView style={STYLES.flex}>
        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          style={STYLES.flex}
        ></ScrollView>
        <View style={[styles.searchWrap]}>
          <BaseInput
            placeholder="Ask a question..."
            numberOfLines={4}
            autoHeight={false}
            bottomSpacing={false}
          />
          <View style={[STYLES.flexRow, STYLES.justifyEnd]}>
            <BaseButton
              style={styles.buttonStyle}
              customComponent={
                <AntDesign name="arrowup" size={24} color="black" />
              }
              disabled
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = StyleSheet.create({
  searchWrap: {
    position: "absolute",
    bottom: 5,
    width: SCREEN_WIDTH - 16,
    left: 8,
    gap: 6,
    backgroundColor: COLORS.darkTertiary,
    borderRadius: 12,
    minHeight: 82,
    paddingTop: 6,
  },
  buttonStyle: {
    height: 30,
    width: 30,
    paddingHorizontal: 0,
    paddingVertical: 0,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
    marginBottom: 4,
  },
});

export default RagBot;
