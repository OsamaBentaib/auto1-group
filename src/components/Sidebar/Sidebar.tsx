import { Typography, Box, Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import theme from "../../theme/theme";
import CustomButton from "../CustomButton/CustomButton";
import { useSearchParams } from "react-router-dom";
import FilterMenu from "../FilterMenu/FilterMenu";
import { useColors, useManifacturer } from "../../hooks/fetchHook";

interface Props {
  onFilterCallback: () => void;
}

const shortBy = [
  { title: "None", value: "none" },
  { title: "ASC", value: "asc" },
  { title: "DES", value: "des" },
];

function Sidebar({ onFilterCallback }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: colorsData, isFetching: isColorsFetching } = useColors();

  const { data: manifactursData, isFetching: isManifactursFetching } =
    useManifacturer();

  const colors = [
    { title: "All car colors", value: "all" },
    ...(colorsData ?? []),
  ];

  const manifacturers = [
    { title: "All Manifacturer", value: "all" },
    ...(manifactursData ?? []),
  ];

  const selectedColor = searchParams.get("color") ?? colors[0].value;

  const selectedManifacturer =
    searchParams.get("manifacturer") ?? manifacturers[0].value;

  const selectedShort = searchParams.get("sortBy") ?? shortBy[0].value;

  const handleSelect = (name: string, value: string) => {
    if (value === "all" || value === "none") {
      searchParams.delete(name);
    } else {
      searchParams.set(name, value);
    }
    setSearchParams(searchParams);
  };

  const fetchManifacturer = () => {};

  const fetchColors = () => {};

  useEffect(() => {
    fetchManifacturer();
    fetchColors();
  }, []);

  return (
    <Box
      sx={{
        padding: theme.spacing(2),
        width: "100%",
        border: "1px solid" + theme.palette.neutral,
      }}
    >
      <Box>
        {isColorsFetching ? (
          <>
            <Skeleton
              data-testid={"colors-skeleton"}
              variant="rectangular"
              width={"30%"}
              height={15}
            />
            <Box marginTop={theme.spacing(0.5)}>
              <Skeleton
                data-testid={"colors-skeleton"}
                variant="rectangular"
                width={"100%"}
                height={20}
              />
            </Box>
          </>
        ) : (
          <>
            <Typography component="h5">Color</Typography>
            <FilterMenu
              options={colors}
              onSelectCallback={handleSelect}
              name="color"
              selectedItem={selectedColor}
            />
          </>
        )}
      </Box>
      <Box marginTop={theme.spacing(0.75)}>
        {isManifactursFetching ? (
          <>
            <Skeleton
              data-testid={"manifacturers-skeleton"}
              variant="rectangular"
              width={"30%"}
              height={15}
            />
            <Box marginTop={theme.spacing(0.5)}>
              <Skeleton
                data-testid={"manifacturers-skeleton"}
                variant="rectangular"
                width={"100%"}
                height={20}
              />
            </Box>
          </>
        ) : (
          <>
            <Typography component="h5">Manifacturer</Typography>
            <FilterMenu
              options={manifacturers}
              onSelectCallback={handleSelect}
              name="manifacturer"
              selectedItem={selectedManifacturer}
            />
          </>
        )}
      </Box>
      <Box marginTop={theme.spacing(0.75)}>
        <Typography component="h5">Sort by</Typography>
        <FilterMenu
          options={shortBy}
          onSelectCallback={handleSelect}
          name="sortBy"
          selectedItem={selectedShort}
        />
      </Box>
      <Box
        display="flex"
        paddingTop={theme.spacing(2)}
        justifyContent="flex-end"
      >
        <CustomButton
          onClick={onFilterCallback}
          variant={"contained"}
          disableElevation
        >
          Filter
        </CustomButton>
      </Box>
    </Box>
  );
}

export default Sidebar;
