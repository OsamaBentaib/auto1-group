import { Button, ButtonProps, Box } from "@mui/material";
import React, { ReactNode, useState } from "react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { MenuOptions } from "../../types";
import theme from "../../theme/theme";

interface MenuProps {
  children: ReactNode;
}

const Menu = ({ children }: MenuProps) => (
  <Box
    sx={{
      width: "100%",
      border: "1px solid " + grey[200],
      borderRadius: "3px",
      marginTop: theme.spacing(0.5),
      cursor: "pointer",
    }}
    data-testid={"menu-option"}
  >
    {children}
  </Box>
);

interface MenuItemProps {
  option: MenuOptions;
  selected: boolean;
  onClickCallback: () => void;
}

const MenuItem = ({ option, selected, onClickCallback }: MenuItemProps) => (
  <Box
    onClick={onClickCallback}
    sx={{
      padding: theme.spacing(0.5),
      borderBottom: "1px solid " + grey[200],
      "&:hover": {
        ...(!selected && { background: grey[200] }),
      },
      ...(selected && {
        background: theme.palette.primary.main,
        color: "white",
      }),
    }}
  >
    {option.title}
  </Box>
);

const SelectButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: grey["A700"],
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: grey[200],
  },
  border: "1px solid" + grey[200],
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
}));

interface Props {
  onSelectCallback: (name: string, value: string) => void;
  options: MenuOptions[];
  name: string;
  selectedItem: string;
}

function FilterMenu({ onSelectCallback, options, name, selectedItem }: Props) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = useState(
    selectedItem === "all" ? options[0].title : selectedItem
  );

  const handleClick = () => setMenuOpen(!menuOpen);
  const handleClose = () => setMenuOpen(false);

  const handleSelect = (option: MenuOptions) => {
    setSelectedOption(option.value);
    onSelectCallback(name, option.value);
    handleClose();
  };

  return (
    <>
      <SelectButton
        fullWidth
        sx={{ marginTop: theme.spacing(0.5) }}
        variant="contained"
        data-testid={"menu-button"}
        disableElevation
        onClick={handleClick}
        endIcon={
          menuOpen ? (
            <ArrowDropUp sx={{ color: grey[400] }} />
          ) : (
            <ArrowDropDown style={{ color: grey[400] }} />
          )
        }
      >
        {selectedOption}
      </SelectButton>
      {menuOpen && (
        <Menu>
          {options.map((option) => (
            <MenuItem
              key={option.title}
              option={option}
              onClickCallback={() => handleSelect(option)}
              selected={selectedOption === option.value}
            />
          ))}
        </Menu>
      )}
    </>
  );
}

export default FilterMenu;
