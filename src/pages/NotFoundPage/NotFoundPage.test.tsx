import { render, screen } from "@testing-library/react";
import NotFoundPage from "./NotFoundPage";

describe("NotFoundPage", () => {
  it("should render the page elements", () => {
    render(<NotFoundPage />);
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
