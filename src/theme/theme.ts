import { grey, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    allVariants: {
      color: grey["A700"],
    },
  },
  palette: {
    primary: {
      main: "#ea7f28",
      contrastText: "#fff",
    },
    secondary: {
      main: "#d37324",
    },
    info: {
      main: "#4a4a4a",
    },
    neutral: "#ededed",
    error: {
      main: red.A400,
    },
  },
  spacing: 16,
});

declare module "@mui/material/styles" {
  interface Palette {
    neutral: string;
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: string;
  }
}

export default theme;
