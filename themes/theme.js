import { DefaultTheme, DarkTheme } from "@react-navigation/native";

// React Navigation 7 requires a `fonts` key on themes, so extend its built-in themes
export const lightTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      primary: "#6200EE",
      background: "#FFFFFF",
      card: "#F5F5F5",
      text: "#000000",
      border: "#E0E0E0",
      notification: "#FF4081",
    },
  };
  
  export const darkTheme = {
    ...DarkTheme,
    dark: true,
    colors: {
      primary: "#BB86FC",
      background: "#121212",
      card: "#1E1E1E",
      text: "#FFFFFF",
      border: "#272727",
      notification: "#CF6679",
    },
  };
  