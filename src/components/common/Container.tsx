import { View, StyleSheet } from "react-native";
import React, { PropsWithChildren } from "react";
import { COLORS } from "@/src/constants/colors";

interface ContainerProps {
  children: React.ReactNode;
  centered?: boolean;
}
const Container = ({ children, centered }: ContainerProps) => {
  return (
    <View style={[styles.containerStyles, centered ? styles.centered : {}]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyles: {
    flex: 1,
    backgroundColor: COLORS.dark,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Container;
