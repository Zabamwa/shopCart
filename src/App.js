import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { Provider } from "mobx-react";
import Home from "./components/Home";
import appStore from "./stores/appStore";
import userStore from "./stores/userStore";
import { COLORS } from "./styles/colors";

export const stores = {
  appStore,
  userStore,
};

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: "Roboto, sans-serif",
  },
  palette: {
    primary: {
      main: COLORS.PRIMARY,
    },
    secondary: {
      main: COLORS.SECONDARY,
    },
  },
});

function App() {
  return (
    <Provider {...stores}>
      <MuiThemeProvider theme={theme}>
        <Home />
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
