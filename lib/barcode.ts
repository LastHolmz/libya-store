import prisma from "@/prisma/db";

const generateUniqueBarcode = async (): Promise<string> => {
  let barcode: string;
  let existingProduct: any;

  do {
    // Generate a 7-digit random number
    barcode = Math.floor(1000000 + Math.random() * 900000).toString();

    // Check if the barcode already exists in the database
    existingProduct = await prisma.order.findUnique({
      where: { barcode },
    });
  } while (existingProduct);

  return barcode;
};

export { generateUniqueBarcode };
