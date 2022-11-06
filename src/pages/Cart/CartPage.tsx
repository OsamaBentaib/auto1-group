import {
  Box,
  Container,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import theme from "../../theme/theme";
import { Car } from "../../types";
import CarCard from "../../components/CarCard/CarCard";
import CloseIcon from "@mui/icons-material/Close";

function CartPage() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [data, setData] = useState<Car[]>(
    JSON.parse(localStorage.getItem("favorites") ?? "[]")
  );

  const handleRemoveFromFavorite = (stockNumber: number) => {
    const updatedCart = data.filter((e) => e.stockNumber !== stockNumber);
    localStorage.setItem("favorites", JSON.stringify(updatedCart));
    setData(updatedCart);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Container>
        <Box
          marginTop={theme.spacing(0.75)}
          sx={{ height: "calc(100vh - 10.125rem)" }}
        >
          {data.length ? (
            data.map((car: Car) => (
              <CarCard
                key={car.stockNumber * car.mileage.number}
                car={car}
                removeFromCartCallback={handleRemoveFromFavorite}
              />
            ))
          ) : (
            <Box
              display="flex"
              height="100%"
              justifyContent={"center"}
              alignItems="center"
            >
              <Typography variant="h5" gutterBottom fontWeight={"bold"}>
                You have no items in your cart
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Item has been removed from cart"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
}

export default CartPage;
