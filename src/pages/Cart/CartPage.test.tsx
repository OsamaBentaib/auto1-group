import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { carsListData } from "../../test-data";
import CartPage from "./CartPage";

describe("CartPage", () => {
  describe("when page renders and localstorage not empty", () => {
    it("should render all the saved cars in localstorage", async () => {
      Object.defineProperty(window, "localStorage", {
        value: (() => {
          let store = JSON.stringify(carsListData);
          return {
            getItem: function (key: string) {
              return store;
            },
            setItem: function (key: string, value: string) {
              store = value;
            },
          };
        })(),
      });
      render(<CartPage />);

      carsListData.forEach((item, i) => {
        expect(screen.getByText(item.modelName)).toBeInTheDocument();
        expect(screen.getAllByTestId("car-info")[i].textContent).toBe(
          `Stock # ${item.stockNumber} - ${item.mileage.number} ${item.mileage.unit} - ${item.fuelType} - ${item.color}`
        );
        const removeButton = screen.getAllByText("Remove")[i];
        expect(removeButton).toBeInTheDocument();
      });
      const removeButtonForFirstItem = screen.getAllByText("Remove")[0];
      userEvent.click(removeButtonForFirstItem);
      await waitFor(() => {
        expect(
          screen.queryByText(carsListData[0].modelName)
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("when page renders and localstorage empty", () => {
    it("should render empty cart message", async () => {
      jest.spyOn(Storage.prototype, "setItem");
      jest.spyOn(window.localStorage, "getItem").mockReturnValue("[]");
      Storage.prototype.setItem = jest.fn();
      render(<CartPage />);

      expect(
        screen.getByText("You have no items in your cart")
      ).toBeInTheDocument();
    });
  });
});
