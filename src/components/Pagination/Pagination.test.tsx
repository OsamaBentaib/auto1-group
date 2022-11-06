import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Pagination from "./Pagination";

describe("Pagination", () => {
  describe("when page first render", () => {
    it("should render the page elements", () => {
      render(
        <MemoryRouter initialEntries={["/?page=2"]}>
          <Pagination totalCarsCount={100} totalPageCount={10} />
        </MemoryRouter>
      );

      expect(screen.getByText("Previews").getAttribute("href")).toEqual(
        "?page=1"
      );
      expect(screen.getByText("First").getAttribute("href")).toEqual("?page=1");
      expect(screen.getByText("Page 2 of 10")).toBeInTheDocument();
      expect(screen.getByText("Next").getAttribute("href")).toEqual("?page=3");
      expect(screen.getByText("Last").getAttribute("href")).toEqual("?page=10");
    });
  });
});
