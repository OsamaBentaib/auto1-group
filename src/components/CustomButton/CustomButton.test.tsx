import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomButton from "./CustomButton";

describe("CustomButton", () => {
  describe("when button render", () => {
    const onClick = jest.fn();

    it("should render button props and content", () => {
      render(
        <CustomButton
          onClick={onClick}
          type="submit"
          style={{ color: "white" }}
        >
          Button Name
        </CustomButton>
      );
      const button = screen.getByText("Button Name");
      expect(button).toBeInTheDocument();
      expect(button.getAttribute("type")).toEqual("submit");
      expect(button.style.color).toEqual("white");
      userEvent.click(button);
      expect(onClick).toHaveBeenCalled();
    });
  });
});
