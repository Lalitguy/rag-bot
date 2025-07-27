import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import React, { PropsWithChildren } from "react";
import { COLORS } from "@/src/constants/colors";

interface ContainerProps {
  children: React.ReactNode;
  centered?: boolean;
  style?: StyleProp<ViewStyle>;
}
const Container = ({ children, centered, style = {} }: ContainerProps) => {
  return (
    <View
      style={[styles.containerStyles, style, centered ? styles.centered : {}]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyles: {
    flex: 1,
    backgroundColor: COLORS.darkTertiary,
    padding: 12,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Container;
