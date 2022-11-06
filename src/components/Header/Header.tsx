import { Box, Container, Link } from "@mui/material";
import { grey } from "@mui/material/colors";
import { NavLink } from "react-router-dom";
import theme from "../../theme/theme";

function Header() {
  console.log(theme.breakpoints.between("lg", "xl"));
  return (
    <Box
      sx={{
        borderBottom: "1px solid" + grey[300],
      }}
    >
      <Container>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          height="5.063rem"
          sx={{
            [theme.breakpoints.between("lg", "xl")]: {
              flexDirection: "flex",
            },
            [theme.breakpoints.between("xs", "md")]: {
              flexDirection: "column",
            },
          }}
        >
          <Box>
            <NavLink to="/">
              <img
                width={200}
                src="https://auto1-js-task-api--mufasa71.repl.co/images/logo.png"
                alt="auto1-group"
              />
            </NavLink>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent="space-between"
            width="13rem"
          >
            <Link href="#" underline="none" color={grey["A700"]}>
              Purchase
            </Link>
            <Link href="#" underline="none" color={grey["A700"]}>
              My Orders
            </Link>
            <Link href="#" underline="none" color={grey["A700"]}>
              Sell
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Header;
