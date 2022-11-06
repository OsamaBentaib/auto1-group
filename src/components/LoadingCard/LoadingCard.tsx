import { Box, Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { grey } from "@mui/material/colors";
import React from "react";
import theme from "../../theme/theme";

function LoadingCard() {
  return (
    <Box
      sx={{ border: "1px solid" + grey[300] }}
      padding={theme.spacing(0.75)}
      marginBottom={theme.spacing(0.75)}
    >
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Box
            data-testid="image-placeholder"
            sx={{ background: grey[200], height: "100%" }}
          />
        </Grid>
        <Grid item xs={9}>
          <Skeleton
            data-testid="rectangular-1"
            variant="rectangular"
            width={"70%"}
            height={30}
          />
          <Box marginTop={theme.spacing(0.5)}>
            <Skeleton
              data-testid="rectangular-2"
              variant="rectangular"
              width={"70%"}
              height={20}
            />
          </Box>
          <Box marginTop={theme.spacing(0.75)}>
            <Skeleton
              data-testid="rectangular-3"
              variant="rectangular"
              width={"20%"}
              height={20}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoadingCard;
