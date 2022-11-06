import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as fetchHooks from "../../hooks/fetchHook";
import { carsListData } from "../../test-data";
import theme from "../../theme/theme";
import DetailsPage from "./DetailsPage";
describe("DetailsPage", () => {
  describe("when page renders and still fetching", () => {
    it("should display the loading Skeleton", async () => {
      const mock = jest
        .spyOn(fetchHooks, "useCarDetails")
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
          <MemoryRouter initialEntries={["/details/123"]}>
            <DetailsPage />
          </MemoryRouter>
        </QueryClientProvider>
      );

      expect(mock).toHaveBeenCalled();

      const skeletons = screen.getAllByTestId("skeleton");

      expect(skeletons).toHaveLength(7);
      expect(skeletons[0].style.width).toEqual("40%");
      expect(skeletons[1].style.width).toEqual("70%");
      expect(skeletons[2].style.width).toEqual("100%");
      expect(skeletons[3].style.width).toEqual("100%");
      expect(skeletons[4].style.width).toEqual("70%");
      expect(skeletons[5].style.width).toEqual("30%");
      expect(skeletons[6].style.width).toEqual(theme.spacing(8));
    });
  });
  describe("when page renders and the data fetched", () => {
    it("should display the car details along with the save button", async () => {
      const mock = jest
        .spyOn(fetchHooks, "useCarDetails")
        .mockImplementation(
          () => ({ isFetching: false, data: carsListData[0] } as any)
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
          <MemoryRouter initialEntries={["/details/123"]}>
            <DetailsPage />
          </MemoryRouter>
        </QueryClientProvider>
      );

      expect(mock).toHaveBeenCalled();
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

      expect(
        screen.getByText(
          "If you like this car, click the button and save it in your collection of favourite items."
        )
      ).toBeInTheDocument();
    });
  });
});
