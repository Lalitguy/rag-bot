import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import { COLORS } from "@/src/constants/colors";
import { STYLES } from "@/src/constants/styles";
import { AntDesign } from "@expo/vector-icons";

interface ModelCardProps {
  name: string;
  description: string;
  modelSize: string;
  selected?: boolean;
  onPress?: () => void;
}

const ModelCard = ({
  name,
  description,
  modelSize,
  selected,
  onPress,
}: ModelCardProps) => {
  return (
    <View style={styles.cardWrap}>
      <Pressable
        style={styles.card}
        android_ripple={onPress ? { color: COLORS.lightGray } : undefined}
        onPress={onPress}
      >
        <View style={[STYLES.flexRow, STYLES.spaceBetween]}>
          <Text style={styles.name}>{name}</Text>

          <AntDesign
            name="checkcircle"
            size={20}
            color={selected ? COLORS.green : COLORS.lightGray}
          />
        </View>
        <Text style={styles.sizeDesc}>{modelSize}</Text>
        <Text style={styles.desc}>{description}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrap: {
    borderRadius: 8,
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginTop: 10,
    overflow: "hidden",
  },
  card: {
    padding: 10,
  },
  desc: {
    marginTop: 5,
    letterSpacing: 1.1,
    fontFamily: "Fk-Grotesk",
  },
  sizeDesc: {
    marginTop: 5,
    color: COLORS.gray,
    fontFamily: "Fk-Grotesk",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Fk-Grotesk-Bold",
  },
});
export default ModelCard;
