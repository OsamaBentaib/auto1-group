import { render, screen } from "@testing-library/react";
import { carsListData } from "../../test-data";
import userEvent from "@testing-library/user-event";
import CarCard from "./CarCard";

describe("CarCard", () => {
  describe("When the card is listed in the home page results", () => {
    const car = carsListData[0];
    it("should render the page elements with view details action", () => {
      render(<CarCard car={car} />);
      expect(screen.getByText(car.modelName)).toBeInTheDocument();
      expect(screen.getByTestId("car-info").textContent).toBe(
        `Stock # 68830 - 132739 km - Petrol - black`
      );
      expect(screen.getByText("View details")).toBeInTheDocument();
      expect(screen.queryByText("Remove")).not.toBeInTheDocument();
      expect(screen.getByText("View details").getAttribute("href")).toBe(
        "/details/68830"
      );
    });
  });
  describe("When the card is listed in the cart page", () => {
    const car = carsListData[0];
    const onRemoveCallback = jest.fn();
    it("should render the page elements with view details action", () => {
      render(<CarCard car={car} removeFromCartCallback={onRemoveCallback} />);
      expect(screen.getByText(car.modelName)).toBeInTheDocument();
      expect(screen.getByTestId("car-info").textContent).toBe(
        `Stock # 68830 - 132739 km - Petrol - black`
      );
      expect(screen.queryByText("View details")).not.toBeInTheDocument();

      const removeButton = screen.getByText("Remove");

      expect(removeButton).toBeInTheDocument();

      userEvent.click(removeButton);

      expect(onRemoveCallback).toHaveBeenCalled();
    });
  });
});
