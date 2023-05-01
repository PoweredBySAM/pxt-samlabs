import React, { PropsWithChildren } from "react";
import theme from '../Styles/theme'
import { StyledEngineProvider } from "@mui/material/styles";
import { ThemeProvider, CssBaseline } from "@mui/material";

function MuiThemeLayout(props: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        {props?.children}
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default MuiThemeLayout;