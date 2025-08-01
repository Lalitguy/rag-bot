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

export const useFkGroteskFont = () => {
  const [loaded] = useFonts({
    "Fk-Grotesk": require("../../assets/fonts/fk-grotesk/FK-Grotesk-Neue-Regular.otf"),
    "Fk-Grotesk-Bold": require("../../assets/fonts/fk-grotesk/FK-Grotesk-Neue-Bold.otf"),
    "Fk-Grotesk-Italic": require("../../assets/fonts/fk-grotesk/FK-Grotesk-Neue-Italic.otf"),
    "Fk-Grotesk-Medium": require("../../assets/fonts/fk-grotesk/FK-Grotesk-Neue-Medium.otf"),
  });

  return loaded;
};
