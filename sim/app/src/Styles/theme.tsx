// Tailwind theme configuration - main theme colors and typography
// These values are configured in tailwind.config.js

const theme = {
  colors: {
    primary: "#1378A5",
    secondary: "#000",
    error: "#FF0000",
    success: "#21B8A8",
    gray: {
      light: "#f5f5f5",
      medium: "#8C8C8C",
      dark: "#595959",
    },
    device: {
      inactive: "#c4c4c4",
      active: "#26D0C4",
      test: "#D04226",
    },
    border: "#d7d7d7",
  },
  fontFamily: {
    primary: ["Nunito", "Roboto", "Helvetica", "sans-serif"].join(","),
    secondary: ["Orbitron", "sans-serif"].join(","),
  },
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "12px",
  },
};

export default theme;