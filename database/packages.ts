import Constant from "@/constants";
import { getToken } from "./auth";

const BASE_URL = `${Constant.BASE_URL}/customer/package`;

export const createPackage = async (data: PackageData): Promise<any> => {
  const token = await getToken();
  if (!token) {
    return {
      message: "Credintial Error Please Log In Again With Your Vanex Account",
    };
  }
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value.toString());
  });

  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Failed to create package: ${error.message || response.statusText}`
    );
  }

  return response.json();
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
