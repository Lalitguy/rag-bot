import { StyleSheet } from "react-native";
import { COLORS } from "./colors";

export const STYLES = StyleSheet.create({
  centerSelf: {
    alignSelf: "center",
  },
  justifyEnd: {
    justifyContent: "flex-end",
  },
  flex: {
    flex: 1,
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
});
