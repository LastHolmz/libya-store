"use server";

import Constant from "@/constants";
import prisma from "@/prisma/db";
import { ExternalAuth } from "@prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";

const assignToken = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${Constant.BASE_URL}/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: Constant.EMAIL,
        password: Constant.PASSWORD,
      }),
    });

    if (!response.ok) {
      return { message: "Network response was not ok" };
    }

    const data = await response.json();

    if (!data?.data?.access_token) {
      return { message: "Invalid token response" };
    }

    const token = data.data.access_token;

    await prisma.$transaction(async (tx) => {
      const existing = await tx.externalAuth.findFirst();

      if (existing) {
        await tx.externalAuth.update({
          where: { id: existing.id },
          data: { accessToken: token },
        });
      } else {
        await tx.externalAuth.create({
          data: { accessToken: token },
        });
      }
    });

    revalidateTag("tokens");
    return { message: "Token assigned successfully" };
  } catch (error) {
    console.error("Error in assignToken:", error);
    return { message: "Failed to assign token" };
  }
};

const getToken = unstable_cache(
  async (): Promise<ExternalAuth | undefined> => {
    try {
      // assignToken({ email: Constant.EMAIL, password: Constant.PASSWORD });
      const token = await prisma.externalAuth.findFirst({});
      if (!token) {
        return undefined;
      }
      return token;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  },
  ["tokens"],
  { tags: ["tokens"] }
);

export { assignToken, getToken };
