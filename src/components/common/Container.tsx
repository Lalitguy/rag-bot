import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import React, { PropsWithChildren } from "react";
import { COLORS } from "@/src/constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

interface ContainerProps {
  children: React.ReactNode;
  centered?: boolean;
  style?: StyleProp<ViewStyle>;
  noPadding?: boolean;
}
const Container = ({
  children,
  centered,
  style = {},
  noPadding = false,
}: ContainerProps) => {
  return (
    <SafeAreaView
      style={[
        styles.containerStyles,
        style,
        centered ? styles.centered : {},
        noPadding ? {} : styles.paddingStyles,
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyles: {
    flex: 1,
    backgroundColor: COLORS.darkSecondary,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  paddingStyles: {
    padding: 12,
  },
});
export default Container;
