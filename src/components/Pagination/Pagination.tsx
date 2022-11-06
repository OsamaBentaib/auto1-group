import { Box, Link, Typography } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";
import theme from "../../theme/theme";
import { addPageToSearchParams, parseSearchParams } from "../../utits/utils";

interface Props {
  totalPageCount: number;
  totalCarsCount: number;
}

function Pagination({ totalCarsCount, totalPageCount }: Props) {
  const [searchParams] = useSearchParams();

  const currentPage = Number(parseSearchParams(searchParams).get("page") ?? 1);

  const numberOfPages = Math.ceil(totalCarsCount / totalPageCount);

  const firstPage = addPageToSearchParams(searchParams, "1").toString();

  const previewsPage = addPageToSearchParams(
    searchParams,
    (currentPage - 1 ? currentPage - 1 : 1).toString()
  );

  const nextPage = addPageToSearchParams(
    searchParams,
    (currentPage + 1 <= numberOfPages
      ? currentPage + 1
      : currentPage
    ).toString()
  );

  const lastPage = addPageToSearchParams(
    searchParams,
    numberOfPages.toString()
  );

  return (
    <Box
      width="60%"
      margin="auto"
      marginTop={theme.spacing(1.5)}
      marginBottom={theme.spacing(1.5)}
    >
      <Box display="flex" justifyContent="space-between">
        <Link href={firstPage} underline="hover">
          First
        </Link>
        <Link href={previewsPage} underline="hover">
          Previews
        </Link>
        <Typography variant="body1">
          Page {currentPage} of {numberOfPages}
        </Typography>
        <Link href={nextPage} underline="hover">
          Next
        </Link>
        <Link href={lastPage} underline="hover">
          Last
        </Link>
      </Box>
    </Box>
  );
}

export default Pagination;
