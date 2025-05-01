"use server";

import Constant from "@/constants";
import { getToken } from "./auth";
import { unstable_cache } from "next/cache";

/** SHARED FETCH WRAPPER */

const vanexFetch = async <T>(url: string): Promise<T | null> => {
  try {
    const token = await getToken();
    // if (!token?.accessToken) {
    //   assignToken({ email: "", password: "" });
    //   token = await getToken();
    // }
    console.log(token ?? "no token found");

    if (!token?.accessToken) {
      return null;
    }

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
      },
    });

    const json = await res.json();

    if (json?.status_code === 200 && json?.data) {
      return json.data as T;
    }
  } catch (err) {
    console.error("Vanex fetch error:", err);
  }

  return null;
};

/** CITIES */

export const fetchAllCities = unstable_cache(
  async (): Promise<City[]> => {
    try {
      const cities = await vanexFetch<City[]>(
        `${Constant.BASE_URL}/city/names`
      );
      console.log("first");
      console.log(cities);
      return cities ?? [];
    } catch (err) {
      console.error("fetchAllCities error:", err);
      return [];
    }
  },
  ["cities"],
  { tags: ["cities"], revalidate: 60 * 60 * 24 }
);

export const getCityById = async (id: number): Promise<City | undefined> => {
  try {
    const cities = await fetchAllCities();
    return cities.find((city) => city.id === id);
  } catch (err) {
    console.error("getCityById error:", err);
    return undefined;
  }
};

/** SUBCITIES */

export const fetchSubCitiesByCityId = unstable_cache(
  async (cityId?: number): Promise<SubCity[]> => {
    try {
      if (!cityId) return [];
      const result = await vanexFetch<{ data: SubCity[] }>(
        `${Constant.BASE_URL}/city/${cityId}/subs`
      );
      return result?.data ?? [];
    } catch (err) {
      console.error("fetchSubCitiesByCityId error:", err);
      return [];
    }
  },
  ["subcities"],
  { tags: ["subcities"], revalidate: 60 * 60 * 24 }
);

export const getSubCityById = async (
  subCityId: number,
  cityId: number
): Promise<SubCity | undefined> => {
  try {
    const subs = await fetchSubCitiesByCityId(cityId);
    return subs.find((sub) => sub.id === subCityId);
  } catch (err) {
    console.error("getSubCityById error:", err);
    return undefined;
  }
};

/** DELIVERY CALCULATION */

export const calculateDelivery = async (params: {
  destination: number;
  sub_city_id: number;
  sender_region: number;
  height: number;
  leangh: number;
  width: number;
  price: number;
  delivery_type: number;
}): Promise<DeliveryCalculation | undefined> => {
  try {
    const token = await getToken();
    if (!token?.accessToken) return undefined;

    const query = new URLSearchParams(params as any).toString();
    const url = `${Constant.BASE_URL}/delivery-calculation?${query}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    });

    const json = await res.json();

    if (json?.status_code === 200) {
      return json as DeliveryCalculation;
    }
  } catch (err) {
    console.error("calculateDelivery error:", err);
  }

  return undefined;
};
