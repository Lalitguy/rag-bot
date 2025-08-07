import { COLORS } from "@/src/constants/colors";
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import BaseText from "./BaseText";
import { STYLES } from "@/src/constants/styles";

const DownloadProgress = ({
  progress,
  text,
}: {
  progress: number;
  text?: string;
}) => {
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
      {text && <BaseText text={text} />}
      <View style={[STYLES.flexRow, STYLES.itemsCenter, STYLES.gap12]}>
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
        <BaseText style={styles.percentage} text={`${percentage}%`} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 4,
    padding: 12,
  },
  track: {
    height: 6,
    backgroundColor: COLORS.lightGray,
    borderRadius: 3,
    overflow: "hidden",
    flex: 1,
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
