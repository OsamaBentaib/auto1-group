import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { menuOptionsData } from "../../test-data";
import { MenuOptions } from "../../types";
import FilterMenu from "./FilterMenu";

describe("FilterMenu", () => {
  describe("when the button render", () => {
    const onSelectCallback = jest.fn();
    const options: MenuOptions[] = menuOptionsData;

    it("should render button props and content", async () => {
      render(
        <FilterMenu
          onSelectCallback={onSelectCallback}
          options={options}
          name="manifacturer"
          selectedItem={"all"}
        />
      );
      const button = screen.getByTestId("menu-button");
      expect(button).toBeInTheDocument();
      expect(screen.queryByTestId("menu-option")).not.toBeInTheDocument();
      userEvent.click(button);
      await waitFor(() => {
        expect(screen.getByTestId("menu-option")).toBeInTheDocument();
      });
      const optionElement = screen.getByText(options[1].title);
      expect(optionElement).toBeInTheDocument();
      userEvent.click(optionElement);
      await waitFor(() => {
        expect(onSelectCallback).toHaveBeenCalledWith(
          "manifacturer",
          options[1].value
        );
      });
      expect(screen.getByTestId("menu-button").textContent).toBe(
        options[1].title
      );
      await waitFor(() => {
        expect(screen.queryByTestId("menu-option")).not.toBeInTheDocument();
      });
    });
  });
});
