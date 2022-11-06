import { render, screen } from "@testing-library/react";
import LoadingCard from "./LoadingCard";

describe("LoadingCard", () => {
  it("should render the page elements", () => {
    render(<LoadingCard />);
    const rectangular1 = screen.getByTestId("rectangular-1");
    const rectangular2 = screen.getByTestId("rectangular-2");
    const rectangular3 = screen.getByTestId("rectangular-3");
    const imagePlaceholder = screen.getByTestId("image-placeholder");

    expect(imagePlaceholder).toBeInTheDocument();
    expect(rectangular1).toBeInTheDocument();
    expect(rectangular2).toBeInTheDocument();
    expect(rectangular3).toBeInTheDocument();

    expect(rectangular1.style.width).toBe("70%");
    expect(rectangular2.style.width).toBe("70%");
    expect(rectangular3.style.width).toBe("20%");
  });
});
