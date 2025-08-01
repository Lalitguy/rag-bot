import { COLORS } from "@/src/constants/colors";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const Spinner = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    );

    spinAnimation.start();

    return () => spinAnimation.stop();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={[styles.container]}>
      <Animated.View
        style={[
          styles.spinner,
          {
            transform: [{ rotate: spin }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  spinner: {
    borderRadius: 50,
    borderStyle: "solid",
    width: 24,
    height: 24,
    borderWidth: 2,
    borderTopColor: COLORS.white,
    borderRightColor: "#ffffff40",
    borderBottomColor: "#ffffff40",
    borderLeftColor: "#ffffff40",
  },
});

export default Spinner;
