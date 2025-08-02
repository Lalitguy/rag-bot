import { StyleSheet } from "react-native";
import { COLORS } from "./colors";

export const STYLES = StyleSheet.create({
  centerSelf: {
    alignSelf: "center",
  },
  endSef: {
    alignSelf: "flex-end",
  },
  justifyEnd: {
    justifyContent: "flex-end",
  },
  flex: {
    flex: 1,
    position: "relative",
  },
  textBold: {
    fontFamily: "Nunito-Bold",
  },
  textSemiBold: {
    fontFamily: "Nunito-Semi",
  },
  error: {
    color: COLORS.error,
    fontSize: 12,
    fontFamily: "Nunito",
  },
  flexRow: {
    flexDirection: "row",
  },
  itemsCenter: {
    alignItems: "center",
  },
  textFkBold: {
    fontFamily: "Fk-Grotesk-Bold",
    fontSize: 16,
  },
  textFkRegular: {
    fontFamily: "Fk-Grotesk",
  },
  fontSize16: {
    fontSize: 16,
  },
  mTop10: {
    marginTop: 10,
  },
});
