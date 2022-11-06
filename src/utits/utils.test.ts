import { addPageToSearchParams, parseSearchParams } from "./utils";

describe("parseSearchParams", () => {
  it("Should parse URL if the page param is invalid", () => {
    const params = new URLSearchParams({ page: "lol" });
    const url = parseSearchParams(params);
    expect(url.get("page")).toBe("1");
  });

  it("Should keep the page param same if url valid valid", () => {
    const params = new URLSearchParams({ page: "2" });
    const url = parseSearchParams(params);
    expect(url.get("page")).toBe("2");
  });
});

describe("addPageToSearchParams", () => {
  it("Should add page to params", () => {
    const params = new URLSearchParams({ page: "2", color: "Red" });
    const url = addPageToSearchParams(params, "3");
    expect(url).toBe("?page=3&color=Red");
  });
});
