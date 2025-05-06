"use server";

import Constant from "@/constants";
import {
  CreatePackageResponse,
  CreateVanexOrderInput,
  GetPackagesResponse,
  PackageQueryParams,
} from "@/types/interfaces";
import { getToken } from "./auth";
import { unstable_cache as cache, revalidateTag } from "next/cache";
import { z } from "zod";
import prisma from "@/prisma/db";
const BASE_URL = `${Constant.BASE_URL}`;
const CreatePackageResponseSchema = z.object({
  status_code: z.number().optional(),
  message: z.string(),
  package_code: z.string().optional(),
  errors: z.boolean().optional(),
});

type CreatePackageResponseWithZod = z.infer<typeof CreatePackageResponseSchema>;

export const getPackages = cache(
  async (params: PackageQueryParams = {}): Promise<GetPackagesResponse> => {
    const token = await getToken(); // Replace with secure method
    if (!token) {
      return {
        status_code: 401,
        message: "Credintial Error Please Log In Again With Your Vanex Account",
        data: {
          data: [],
          links: {},
          meta: {
            current_page: 0,
            total: 0,
            per_page: 0,
            last_page: 0,
          },
        },
        errors: true,
      };
    }
    const query = new URLSearchParams();

    if (params.page) query.set("page", params.page.toString());
    if (params.perPage) query.set("per-page", params.perPage.toString());
    if (params.status) query.set("status", params.status);

    const url = `${Constant.BASE_URL}/customer/package?${query.toString()}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        Accept: "application/json",
      },
      // cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch packages: ${res.statusText}`);
    }

    return res.json();
  },
  ["vanex:packages"],
  { tags: ["vanex:packages"], revalidate: 60 * 60 }
);

export const createPackage = async (
  data: PackageData & { orderId: string }
): Promise<CreatePackageResponseWithZod> => {
  try {
    const token = await getToken();

    if (!token) {
      return {
        message:
          "Credential error: Please log in again with your Vanex account.",
      };
    }

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "products" && Array.isArray(value)) {
        formData.append("products", JSON.stringify(value));
      } else {
        formData.append(key, value.toString());
      }
    });

    const response = await fetch(`${BASE_URL}/customer/package`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
      body: formData,
    });

    const json = await response.json();

    const parsed = CreatePackageResponseSchema.safeParse(json);

    if (!parsed.success) {
      return {
        message: "Invalid response from Vanex API.",
        errors: true,
      };
    }

    const resData = parsed.data;

    if (!response.ok) {
      return {
        ...resData,
        message: `Failed to create package: ${
          resData.message || response.statusText
        }`,
        errors: true,
        status_code: response.status,
      };
    }

    // await prisma.$transaction(async (tx) => {
    //   const order = tx.order.update({
    //     where: { id: data.orderId },
    //     data: {
    //       vanexPackageCode: resData.package_code,
    //     },
    //     include: { orderItems: true },
    //   });
    //   if (data.products && data.products.length > 0) {

    //   }
    // });

    revalidateTag("vanex:packages");

    return resData;
  } catch (error: any) {
    return {
      message: `Failed to create package: ${error.message || error}`,
      errors: true,
    };
  }
};

export async function createPackagea(
  data: CreateVanexOrderInput
): Promise<CreatePackageResponse> {
  const token = await getToken();
  if (!token) {
    return {
      status_code: 401,
      message: "Credintial Error Please Log In Again With Your Vanex Account",
      package_code: "",
      errors: true,
    };
  }
  try {
    const res = await fetch(`${Constant.BASE_URL}/customer/package`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        errors: true,
        message: result?.message || "Failed to create package",
        package_code: "",
        status_code: 400,
      };
    }

    return result as CreatePackageResponse;
  } catch (error: any) {
    throw new Error(
      error?.message || "Something went wrong while creating the package"
    );
  }
}
