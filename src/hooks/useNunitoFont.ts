import { useFonts } from "expo-font";

export const useNunitoFont = () => {
  const [loaded] = useFonts({
    Nunito: require("../../assets/fonts/nunito/Nunito-Regular.ttf"),
    "Nunito-Bold": require("../../assets/fonts/nunito/Nunito-Bold.ttf"),
    "Nunito-Semi": require("../../assets/fonts/nunito/Nunito-SemiBold.ttf"),
    "Nunito-Italic": require("../../assets/fonts/nunito/Nunito-Italic.ttf"),
    "Nunito-Medium": require("../../assets/fonts/nunito/Nunito-Medium.ttf"),
  });

  return loaded;
};
