import { Button, ButtonProps } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  width: theme.spacing(8),
  height: theme.spacing(2),
}));

function CustomButton(props: ButtonProps) {
  return <StyledButton {...props} />;
}

export default CustomButton;
