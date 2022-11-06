import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from "react-router-dom";
import * as fetchHooks from "./hooks/fetchHook";
import {
  carsListData,
  carsResponse,
  colorsResponse,
  manifacturerResponse,
} from "./test-data";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import CartPage from "./pages/Cart/CartPage";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const queryClient = new QueryClient();
const renderApp = (path: string) =>
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );

describe("App", () => {
  describe("when visit /", () => {
    it("should render the home page", () => {
      const mockUseCars = jest
        .spyOn(fetchHooks, "useCars")
        .mockImplementation(
          () => ({ isFetching: false, data: carsResponse } as any)
        );
      const mockUseColors = jest
        .spyOn(fetchHooks, "useColors")
        .mockImplementation(
          () => ({ isFetching: false, data: colorsResponse } as any)
        );
      const mockUseManifacturer = jest
        .spyOn(fetchHooks, "useManifacturer")
        .mockImplementation(
          () => ({ isFetching: false, data: manifacturerResponse } as any)
        );
      renderApp("/");

      expect(mockUseCars).toHaveBeenCalled();
      expect(mockUseColors).toHaveBeenCalled();
      expect(mockUseManifacturer).toHaveBeenCalled();
      expect(screen.getByText("Color")).toBeInTheDocument();
      expect(screen.getByText("Manifacturer")).toBeInTheDocument();
      expect(screen.getByText("Availabe cars")).toBeInTheDocument();
    });
  });
  describe("when visit /details/:id", () => {
    it("should render the details page", () => {
      const mockUseCarDetails = jest
        .spyOn(fetchHooks, "useCarDetails")
        .mockImplementation(
          () => ({ isFetching: false, data: carsListData[0] } as any)
        );
      renderApp("/details/123");

      expect(mockUseCarDetails).toHaveBeenCalled();
      expect(screen.getByText(carsListData[0].modelName)).toBeInTheDocument();
      expect(screen.getByTestId("car-info").textContent).toBe(
        `Stock # ${carsListData[0].stockNumber} - ${carsListData[0].mileage.number} ${carsListData[0].mileage.unit} - ${carsListData[0].fuelType} - ${carsListData[0].color}`
      );
      expect(
        screen.getByText(
          `This car is currently available and can be delivered as soon as tomorrow morning. Please be aware that delivery times shown in this page are not definitive and may change due to bad weather conditions.`
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "If you like this car, click the button and save it in your collection of favourite items."
        )
      ).toBeInTheDocument();
    });
  });
  describe("when visit /cart", () => {
    Object.defineProperty(window, "localStorage", {
      value: (() => {
        let store = JSON.stringify(carsListData);
        return {
          getItem: (key: string) => {
            return store;
          },
          setItem: (key: string, value: string) => {
            store = value;
          },
        };
      })(),
    });
    it("should render the cart page", () => {
      jest.spyOn(Storage.prototype, "setItem");
      jest.spyOn(window.localStorage, "getItem").mockReturnValue("[]");
      Storage.prototype.setItem = jest.fn();

      renderApp("/cart");

      expect(
        screen.getByText("You have no items in your cart")
      ).toBeInTheDocument();
    });
  });
  describe("when visit invalid link", () => {
    it("should render the home page", () => {
      renderApp("/anyInvalidURL");

      expect(screen.getByAltText("large auto-1 group")).toBeInTheDocument();
      expect(screen.getByText("404 - Not Found")).toBeInTheDocument();
      expect(
        screen.getByText("Sorry, the page you're looking for does not exist.")
      ).toBeInTheDocument();
      expect(screen.getByTestId("helper").textContent).toBe(
        "You can always go back to the homepage"
      );
    });
  });
});
