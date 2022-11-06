import { useQuery } from "@tanstack/react-query";
import { Car, CarsResponse, Manifacturer, MenuOptions } from "../types";

export function useCarDetails(id: string | undefined) {
  return useQuery({
    queryKey: ["car_details"],
    queryFn: async () => {
      if (id) {
        const data = await fetch(
          "https://auto1-mock-server.herokuapp.com/api/cars/" + id
        ).then((res) => res.json());
        return data ? (data.car as Car) : undefined;
      }
      return undefined;
    },
    retry: false,
  });
}

export function useCars(params: string) {
  return useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      const data = await fetch(
        "https://auto1-mock-server.herokuapp.com/api/cars?" + params
      ).then((res) => res.json());
      return data ? (data as CarsResponse) : undefined;
    },
  });
}

export function useColors() {
  return useQuery({
    queryKey: ["colors"],
    queryFn: async () => {
      const data = await fetch(
        "https://auto1-mock-server.herokuapp.com/api/colors"
      ).then((res) => res.json());
      return data.colors
        ? data.colors.map(
            (value: string) => ({ title: value, value } as MenuOptions)
          )
        : [];
    },
  });
}

export function useManifacturer() {
  return useQuery({
    queryKey: ["manifacturer"],
    queryFn: async () => {
      const data = await fetch(
        "https://auto1-mock-server.herokuapp.com/api/manufacturers"
      ).then((res) => res.json());

      return data.manufacturers
        ? data.manufacturers.map(
            (manufactur: Manifacturer) =>
              ({
                title: manufactur.name,
                value: manufactur.name,
              } as MenuOptions)
          )
        : [];
    },
  });
}
