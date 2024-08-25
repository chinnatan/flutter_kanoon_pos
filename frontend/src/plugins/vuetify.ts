// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify, ThemeDefinition } from "vuetify";
// import colors from "vuetify/util/colors";

const myLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: "#1b6b9d",
    'bg-primary-login-start': "#90a0ac",
    'bg-primary-login-end': "#1b6b9d"
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "myLightTheme",
    themes: {
      myLightTheme,
    },
  },
});
