import Constant from "@/constants";
import { getToken } from "../api/auth";

import { z } from "zod";
import prisma from "@/prisma/db";
import { revalidatePath, revalidateTag } from "next/cache";

const CreatePackageResponseSchema = z.object({
  status_code: z.number().optional(),
  message: z.string(),
  package_code: z.string().optional(),
  errors: z.boolean().optional(),
});

type CreatePackageResponse = z.infer<typeof CreatePackageResponseSchema>;

const BASE_URL = `${Constant.BASE_URL}`;

// export const createPackage = async ({
//   data,
//   orderId,
// }: {
//   data: PackageData;
//   orderId: string;
// }): Promise<{
//   status_code?: number;
//   message: string;
//   package_code?: string;
//   errors?: boolean;
// }> => {
//   try {
//     const token = await getToken();

//     if (!token) {
//       return {
//         message:
//           "Credential error: Please log in again with your Vanex account.",
//       };
//     }

//     const formData = new FormData();

//     // Append all fields
//     Object.entries(data).forEach(([key, value]) => {
//       if (key === "products" && Array.isArray(value)) {
//         // Serialize the products array as JSON string
//         formData.append("products", JSON.stringify(value));
//       } else {
//         formData.append(key, value.toString());
//       }
//     });

//     console.log(JSON.stringify(data));
//     const response = await fetch(`${BASE_URL}/customer/package`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token.accessToken}`,
//       },
//       body: formData,
//     });
//     console.log(response);

//     const resData = await response.json();

//     if (!response.ok) {
//       return {
//         message: `Failed to create package: ${
//           resData.message || response.statusText
//         }`,
//         errors: true,
//         status_code: response.status,
//       };
//     }

//     return {
//       status_code: resData.status_code,
//       message: resData.message,
//       package_code: resData.package_code,
//       errors: resData.errors,
//     };
//   } catch (error: any) {
//     console.log(error);
//     return {
//       message: `Failed to create package: ${error.message || error}`,
//       errors: true,
//     };
//   }
// };

export const createPackage = async ({
  data,
  orderId,
}: {
  data: PackageData;
  orderId: string;
}): Promise<{
  status_code?: number;
  message: string;
  package_code?: string;
  errors?: boolean;
}> => {
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
        // Special case: products must be a string of a JSON array string
        const productsStr = JSON.stringify(value);
        console.log(productsStr);
        formData.append("products", productsStr);
      } else if (typeof value === "boolean") {
        formData.append(key, value ? "true" : "false");
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

    const resData = await response.json();
    const parsed = CreatePackageResponseSchema.safeParse(resData);

    if (!parsed.success) {
      return {
        message: "Invalid response from Vanex API.",
        errors: true,
      };
    }

    if (!response.ok) {
      return {
        message: `Failed to create package: ${
          resData.message || response.statusText
        }`,
        errors: true,
        status_code: response.status,
      };
    }
    if (resData.status_code === 201 && resData.package_code) {
      const packageCode = resData.package_code;
      await prisma.$transaction(async (tx) => {
        const order = await tx.order.update({
          where: { id: orderId },
          data: { vanexPackageCode: packageCode },
          include: { orderItems: true },
        });
        if (!order) {
          return {
            message:
              "Failed to update order with package code, please edit the data manually",
          };
        }

        for (const item of order.orderItems) {
          const sku = await tx.size.findFirst({
            where: { title: item.nameOfSize },
          });
          if (!sku) {
            return {
              message: `Size ${item.nameOfSize} not found in database`,
            };
          }
          if (sku && sku.qty > 0 && sku.qty >= item.qty && sku.title) {
            const updatedSku = await tx.size.updateMany({
              where: { title: sku.title },
              data: {
                qty: {
                  decrement: item.qty,
                },
              },
            });
            if (!updatedSku) {
              return {
                message: `Failed to update size ${sku.title} quantity`,
              };
            }
          }
        }
      });
    }
    revalidatePath("/");
    revalidateTag("vanex:packages");
    return {
      status_code: resData.status_code,
      message: resData.message,
      package_code: resData.package_code,
      errors: resData.errors,
    };
  } catch (error: any) {
    console.error("Vanex package creation error:", error);
    return {
      message: `Failed to create package: ${error.message || error}`,
      errors: true,
    };
  }
};

export const getPackageById = async (id: number): Promise<any> => {
  const token = await getToken();
  if (!token) {
    return {
      message: "Credintial Error Please Log In Again With Your Vanex Account",
    };
  }
  const response = await fetch(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch package with id ${id}`);
  }

  return response.json();
};

export const getAllPackages = async (): Promise<any[]> => {
  const token = await getToken();
  if (!token) {
    // return {
    //   message: "Credintial Error Please Log In Again With Your Vanex Account",
    // };
    return [];
  }
  const response = await fetch(`${BASE_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch packages");
  }

  return response.json();
};

export const cancelPackage = async (id: number): Promise<any> => {
  const token = await getToken();
  if (!token) {
    return {
      message: "Credintial Error Please Log In Again With Your Vanex Account",
    };
  }
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to cancel package with id ${id}`);
  }

  return response.json();
};
