import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import * as fetchHooks from "../../hooks/fetchHook";
import { colorsResponse, manifacturerResponse } from "../../test-data";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
  const onFilterCallbackMock = jest.fn();
  describe("when page renders and still fetching", () => {
    it("should display the loading Skeleton", async () => {
      const mockUseColors = jest
        .spyOn(fetchHooks, "useColors")
        .mockImplementation(
          () => ({ isFetching: true, data: undefined } as any)
        );
      const mockUseManifacturer = jest
        .spyOn(fetchHooks, "useManifacturer")
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
            <Sidebar onFilterCallback={onFilterCallbackMock} />
          </MemoryRouter>
        </QueryClientProvider>
      );

      expect(mockUseColors).toHaveBeenCalled();
      expect(mockUseManifacturer).toHaveBeenCalled();
      const colorsSkeleton = screen.getAllByTestId("colors-skeleton");
      const manifacturersSkeleton = screen.getAllByTestId(
        "manifacturers-skeleton"
      );
      expect(colorsSkeleton).toHaveLength(2);
      expect(manifacturersSkeleton).toHaveLength(2);
    });
  });

  describe("when page renders and the data fetched", () => {
    it("should display the car details along with the save button", async () => {
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
            <Sidebar onFilterCallback={onFilterCallbackMock} />
          </MemoryRouter>
        </QueryClientProvider>
      );

      expect(mockUseColors).toHaveBeenCalled();
      expect(mockUseManifacturer).toHaveBeenCalled();

      expect(screen.getByText("Color")).toBeInTheDocument();
      expect(screen.getByText("Manifacturer")).toBeInTheDocument();
      expect(screen.getByText("All car colors")).toBeInTheDocument();
      expect(screen.getByText("All Manifacturer")).toBeInTheDocument();

      const filterButton = screen.getByText("Filter");
      userEvent.click(filterButton);
      expect(onFilterCallbackMock).toHaveBeenCalled();
    });
  });
});
