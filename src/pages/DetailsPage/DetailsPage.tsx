import { grey } from "@mui/material/colors";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Skeleton,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import theme from "../../theme/theme";
import { useParams } from "react-router-dom";
import { Car } from "../../types";
import CustomButton from "../../components/CustomButton/CustomButton";
import CloseIcon from "@mui/icons-material/Close";
import { useCarDetails } from "../../hooks/fetchHook";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

const Spacing = () => {
  return <span style={{ margin: "0 .4rem" }}> - </span>;
};

function DetailsPage() {
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const { id } = useParams();

  const cardetails = useCarDetails(id);

  const { data, isFetching, error } = cardetails;

  const handleSaveToFavorite = () => {
    if (data) {
      const favorites = JSON.parse(
        localStorage.getItem("favorites") ?? "[]"
      ) as Car[];

      const isExist = favorites.find((e) => e.stockNumber === data.stockNumber);

      if (!isExist) {
        localStorage.setItem("favorites", JSON.stringify([...favorites, data]));
        setSnackbarMessage("Item has been added to your cart");
      } else {
        setSnackbarMessage("This item is already in your cart");
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarMessage(null);
  };

  if (error) return <NotFoundPage />;

  return (
    <>
      <Box height="50vh" sx={{ background: theme.palette.neutral }} />
      <Container>
        <Grid
          marginY={theme.spacing(0.75)}
          spacing={1.5}
          container
          item
          xs={12}
          sx={{ minHeight: "calc(50vh - 10.125rem)" }}
        >
          {!isFetching ? (
            <>
              <Grid item xs={12} md={8}>
                <Typography variant="h4" gutterBottom fontWeight={"bold"}>
                  {data?.modelName}
                </Typography>
                <Typography variant="h6" gutterBottom data-testid="car-info">
                  Stock # {data?.stockNumber}
                  <Spacing />
                  {data?.mileage.number} {data?.mileage.unit}
                  <Spacing />
                  {data?.fuelType}
                  <Spacing />
                  {data?.color}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  This car is currently available and can be delivered as soon
                  as tomorrow morning. Please be aware that delivery times shown
                  in this page are not definitive and may change due to bad
                  weather conditions.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{ border: "1px solid" + theme.palette.neutral }}
                  padding={theme.spacing(1.5)}
                >
                  <Typography variant="body1" gutterBottom>
                    If you like this car, click the button and save it in your
                    collection of favourite items.
                  </Typography>
                  <Box display="flex" justifyContent="flex-end">
                    <CustomButton
                      onClick={handleSaveToFavorite}
                      variant="contained"
                      disableElevation
                    >
                      Save
                    </CustomButton>
                  </Box>
                </Box>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={8}>
                <Skeleton
                  data-testid={"skeleton"}
                  variant="rectangular"
                  width={"40%"}
                  height={30}
                />
                <Box marginTop={theme.spacing(0.75)}>
                  <Skeleton
                    data-testid={"skeleton"}
                    variant="rectangular"
                    width={"70%"}
                    height={30}
                  />
                </Box>
                <Box marginTop={theme.spacing(0.75)}>
                  <Skeleton
                    data-testid={"skeleton"}
                    variant="rectangular"
                    width={"100%"}
                    height={30}
                  />
                </Box>
                <Box marginTop={theme.spacing(0.75)}>
                  <Skeleton
                    data-testid={"skeleton"}
                    variant="rectangular"
                    width={"100%"}
                    height={30}
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{ border: "1px solid" + grey[300] }}
                  padding={theme.spacing(1.5)}
                >
                  <Skeleton
                    data-testid={"skeleton"}
                    variant="rectangular"
                    width={"70%"}
                    height={30}
                  />
                  <Box marginTop={theme.spacing(0.75)}>
                    <Skeleton
                      data-testid={"skeleton"}
                      variant="rectangular"
                      width={"30%"}
                      height={30}
                    />
                  </Box>
                  <Box display="flex" justifyContent="flex-end">
                    <Skeleton
                      data-testid={"skeleton"}
                      variant="rectangular"
                      width={theme.spacing(8)}
                      height={theme.spacing(2)}
                    />
                  </Box>
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <>
            <Link href="/cart" underline="hover">
              View
            </Link>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </>
  );
}

export default DetailsPage;
