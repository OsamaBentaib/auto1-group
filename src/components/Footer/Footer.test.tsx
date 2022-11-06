import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  jest.useFakeTimers().setSystemTime(new Date("2021-01-01"));
  it("should render the page elements", () => {
    render(<Footer />);
    expect(screen.getByTestId("content").textContent).toEqual(
      "Copyright © AUTO1 Group 2021"
    );
  });
});
