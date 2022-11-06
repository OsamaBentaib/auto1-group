import { Box, Grid, Link, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import theme from "../../theme/theme";
import { Car } from "../../types";
import CustomButton from "../CustomButton/CustomButton";

const Spacing = () => {
  return <span style={{ margin: "0 .4rem" }}> - </span>;
};

interface Props {
  car: Car;
  removeFromCartCallback?: (stockNumber: number) => void;
}

function CarCard({ car, removeFromCartCallback }: Props) {
  return (
    <Box
      sx={{ border: "1px solid" + grey[300] }}
      padding={theme.spacing(0.75)}
      marginBottom={theme.spacing(0.75)}
    >
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Box sx={{ background: grey[200], height: "100%" }} />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h5" gutterBottom fontWeight={"bold"}>
            {car.modelName}
          </Typography>
          <Typography variant="subtitle1" gutterBottom data-testid="car-info">
            Stock # {car.stockNumber}
            <Spacing />
            {car.mileage.number} {car.mileage.unit}
            <Spacing />
            {car.fuelType}
            <Spacing />
            {car.color}
          </Typography>
          {removeFromCartCallback ? (
            <CustomButton
              onClick={() => removeFromCartCallback(car.stockNumber)}
              variant="contained"
              disableElevation
            >
              Remove
            </CustomButton>
          ) : (
            <Link href={"/details/" + car.stockNumber} underline="hover">
              View details
            </Link>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default CarCard;
