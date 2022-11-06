import { Box, Link, Typography } from "@mui/material";
import React from "react";

function NotFoundPage() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      sx={{ height: "calc(100vh - 10.125rem)" }}
    >
      <img
        src="https://auto1-js-task-api--mufasa71.repl.co/images/logo.png"
        alt="large auto-1 group"
      />
      <Typography variant="h2" fontWeight="bold">
        404 - Not Found
      </Typography>
      <Typography variant="body1" fontWeight="bold">
        Sorry, the page you're looking for does not exist.
      </Typography>
      <Typography variant="body1" fontWeight="bold" data-testid="helper">
        You can always go back to the <Link href="/">homepage</Link>
      </Typography>
    </Box>
  );
}

export default NotFoundPage;
