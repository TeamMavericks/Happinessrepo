import React from "react";
import MainRouter from "./MainRouter";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import { indigo, pink } from "material-ui/colors";
import { hot } from "react-hot-loader";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#2b2544",
      main: "#161032",
      dark: "#140f2e",
      contrastText: "#fff"
    },
    secondary: {
      light: "#e5f1ff",
      main: "#dcedff",
      dark: "#dfeeff",
      contrastText: "#000"
    },
    openTitle: indigo["400"],
    protectedTitle: pink["400"],
    type: "light"
  }
});

const App = () => (
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <MainRouter />
    </MuiThemeProvider>
  </BrowserRouter>
);

export default hot(module)(App);
