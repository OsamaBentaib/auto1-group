import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as fetchHooks from "../../hooks/fetchHook";
import { carsResponse } from "../../test-data";
import HomePage from "./HomePage";

describe("HomePage", () => {
  describe("when page renders and still fetching", () => {
    it("should display the loading Skeleton", async () => {
      const mock = jest
        .spyOn(fetchHooks, "useCars")
        .mockImplementation(
          () => ({ isFetching: true, data: undefined } as any)
        );
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      });

      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={["/"]}>
            <HomePage />
          </MemoryRouter>
        </QueryClientProvider>
      );

      expect(mock).toHaveBeenCalled();

      const rectangular1 = screen.getAllByTestId("rectangular-1");
      const rectangular2 = screen.getAllByTestId("rectangular-2");
      const rectangular3 = screen.getAllByTestId("rectangular-3");
      const imagePlaceholder = screen.getAllByTestId("image-placeholder");

      expect(imagePlaceholder).toHaveLength(3);
      expect(rectangular1).toHaveLength(3);
      expect(rectangular2).toHaveLength(3);
      expect(rectangular3).toHaveLength(3);
    });
  });
  describe("when page renders and the data fetched", () => {
    it("should display the car details along with the save button", async () => {
      const mock = jest
        .spyOn(fetchHooks, "useCars")
        .mockImplementation(
          () => ({ isFetching: false, data: carsResponse } as any)
        );
      const queryClient = new QueryClient();

      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={["/"]}>
            <HomePage />
          </MemoryRouter>
        </QueryClientProvider>
      );

      expect(mock).toHaveBeenCalled();
      carsResponse.cars.forEach((item, i) => {
        expect(screen.getByText(item.modelName)).toBeInTheDocument();
        expect(screen.getAllByTestId("car-info")[i].textContent).toBe(
          `Stock # ${item.stockNumber} - ${item.mileage.number} ${item.mileage.unit} - ${item.fuelType} - ${item.color}`
        );
      });
      expect(screen.getAllByText("View details")).toHaveLength(
        carsResponse.cars.length
      );
    });
  });
  describe("when page renders and an occured", () => {
    it("should display error message", async () => {
      const mock = jest
        .spyOn(fetchHooks, "useCars")
        .mockImplementation(
          () => ({ isFetching: false, error: "error" } as any)
        );
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      });

      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={["/"]}>
            <HomePage />
          </MemoryRouter>
        </QueryClientProvider>
      );

      expect(mock).toHaveBeenCalled();

      expect(
        screen.getByText("Ooops, Something went wrong")
      ).toBeInTheDocument();
    });
  });
});
