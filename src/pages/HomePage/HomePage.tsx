import { Box, Grid, Typography, Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import CarCard from "../../components/CarCard/CarCard";
import LoadingCard from "../../components/LoadingCard/LoadingCard";
import Pagination from "../../components/Pagination/Pagination";
import Sidebar from "../../components/Sidebar/Sidebar";
import theme from "../../theme/theme";
import { Car } from "../../types";
import { parseSearchParams } from "../../utits/utils";
import { useCars } from "../../hooks/fetchHook";

function HomePage() {
  const [searchParams] = useSearchParams();

  const { data, refetch, isFetching, error } = useCars(
    parseSearchParams(searchParams).toString()
  );

  const loadingList = Array.from(Array(3).keys());

  const onFilter = () => {
    return refetch();
  };

  return (
    <Container>
      <Box marginTop={theme.spacing(1.5)}>
        <Grid container spacing={theme.spacing(1.7)} width="100%">
          <Grid item xs={12} md={5}>
            <Sidebar onFilterCallback={onFilter} />
          </Grid>
          <Grid item xs={12} md={7}>
            {error ? (
              <Typography variant="h6" gutterBottom>
                Ooops, Something went wrong
              </Typography>
            ) : (
              <>
                <Typography variant="h4" gutterBottom fontWeight={"bold"}>
                  Availabe cars
                </Typography>
                {data && (
                  <Typography variant="h6" gutterBottom>
                    Showing {data.totalPageCount} of {data.totalCarsCount}{" "}
                    results
                  </Typography>
                )}
                <Box marginTop={theme.spacing(1.5)}>
                  {isFetching
                    ? loadingList.map((e) => <LoadingCard key={e} />)
                    : data?.cars.map((car: Car) => (
                        <CarCard
                          key={car.stockNumber * car.mileage.number}
                          car={car}
                        />
                      ))}
                </Box>
                {!isFetching && data && (
                  <Pagination
                    totalCarsCount={data.totalCarsCount}
                    totalPageCount={data.totalPageCount}
                  />
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default HomePage;
