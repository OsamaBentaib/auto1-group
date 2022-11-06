export const parseSearchParams = (searchParams: URLSearchParams) => {
  const params = Object.fromEntries(searchParams);
  params.page = !isNaN(Number(params.page)) ? params.page : "1";
  return new URLSearchParams(params);
};

export const addPageToSearchParams = (
  searchParams: URLSearchParams,
  page: string
) => {
  const params = Object.fromEntries(searchParams);
  params.page = page;
  return "?" + new URLSearchParams(params).toString();
};
