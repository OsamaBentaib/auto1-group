import { Box, Typography } from "@mui/material";
import React from "react";
import theme from "../../theme/theme";

function Footer() {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height="5.063rem"
      sx={{
        borderTop: "1px solid" + theme.palette.neutral,
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        data-testid="content"
      >
        Copyright © AUTO1 Group {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}

export default Footer;
