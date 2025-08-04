import { Keyboard } from "react-native";

export const isValidUrl = (url: string): boolean => {
  if (!url) return true; // Optional: empty is allowed

  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch (_) {
    return false;
  }
};

export const dismissKeyboard = () => {
  Keyboard.dismiss();
};
