import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

function Footer() {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height="5.063rem"
      sx={{
        borderTop: "1px solid" + grey[300],
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
