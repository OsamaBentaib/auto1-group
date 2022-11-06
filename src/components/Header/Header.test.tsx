import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe("Header", () => {
  it("should render the page elements", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByAltText("auto1-group")).toBeInTheDocument();
    expect(screen.getByText("Purchase")).toBeInTheDocument();
    expect(screen.getByText("My Orders")).toBeInTheDocument();
    expect(screen.getByText("Sell")).toBeInTheDocument();
  });
});
