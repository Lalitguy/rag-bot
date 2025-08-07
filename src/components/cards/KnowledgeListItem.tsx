import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React from "react";
import BaseText from "../common/BaseText";
import { KnowledgeFormDataWithId } from "@/src/types";
import { COLORS } from "@/src/constants/colors";
import { Link } from "expo-router";

interface Props {
  knowledge: KnowledgeFormDataWithId;
}
const KnowledgeListItem = ({ knowledge }: Props) => {
  return (
    <Link
      href={{
        pathname: "/(rag-bot)/knowledge-base/[id]",
        params: { id: knowledge._id },
      }}
      asChild
    >
      <TouchableHighlight
        style={styles.cardWrap}
        activeOpacity={1}
        underlayColor={COLORS.darkTertiary}
      >
        <View style={styles.cardContent}>
          <BaseText text={knowledge.title} style={styles.titleStyle} />
          <BaseText
            text={knowledge.description}
            style={styles.desc}
            numberOfLines={2}
          />
        </View>
      </TouchableHighlight>
    </Link>
  );
};

const styles = StyleSheet.create({
  cardWrap: {
    paddingHorizontal: 16,
  },
  cardContent: {
    paddingVertical: 16,
    borderBottomColor: COLORS.darkTertiary,
    borderBottomWidth: 1,
  },
  titleStyle: {
    fontFamily: "Nunito-Semi",
    fontSize: 16,
    backgroundColor: "transparent",
  },
  desc: {
    marginTop: 5,
    letterSpacing: 1.1,
    color: COLORS.lightGray,
    opacity: 0.9,
  },
});

export default KnowledgeListItem;
