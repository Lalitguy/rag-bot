import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import React, { PropsWithChildren } from "react";
import { COLORS } from "@/src/constants/colors";

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
    <View
      style={[
        styles.containerStyles,
        style,
        centered ? styles.centered : {},
        noPadding ? {} : styles.paddingStyles,
      ]}
    >
      {children}
    </View>
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
