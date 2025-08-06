import { View, Text, Animated, StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import BaseButton from "../common/BaseButton";
import { AntDesign } from "@expo/vector-icons";
import useKeyboard from "@/src/hooks/useKeyboard";
import { dismissKeyboard } from "@/src/utils";

interface AddButtonProps {
  onPress: () => void;
}
const AddButton = ({ onPress }: AddButtonProps) => {
  const { isKeyboardVisible } = useKeyboard();

  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isKeyboardVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isKeyboardVisible]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });
  return (
    <BaseButton
      customComponent={
        <Animated.View style={[{ transform: [{ rotate }] }]}>
          <AntDesign name="plus" size={24} color="black" />
        </Animated.View>
      }
      style={styles.buttonStyle}
      onPress={isKeyboardVisible ? dismissKeyboard : onPress}
    />
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: 65,
    height: 65,
    alignItems: "center",
    position: "absolute",
    bottom: 80,
    right: 30,
  },
});

export default AddButton;
