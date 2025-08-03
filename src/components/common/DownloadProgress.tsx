import { COLORS } from "@/src/constants/colors";
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const DownloadProgress = ({ progress }: { progress: number }) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const clampedProgress = Math.max(0, Math.min(1, progress || 0));

    Animated.timing(animatedWidth, {
      toValue: clampedProgress,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const percentage = Math.round((progress || 0) * 100);

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <Animated.View
          style={[
            styles.fill,
            {
              width: animatedWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
      <Text style={styles.percentage}>{percentage}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  track: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.lightGray,
    borderRadius: 3,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: COLORS.green,
    borderRadius: 3,
  },
  percentage: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.white,
    minWidth: 35,
  },
});

export default DownloadProgress;
