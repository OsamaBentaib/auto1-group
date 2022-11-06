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
    grey: {
      100: "#ededed",
    },
    error: {
      main: red.A400,
    },
  },
  spacing: 16,
});

export default theme;
