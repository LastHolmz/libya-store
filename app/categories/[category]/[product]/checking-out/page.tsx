const page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    colorId?: string;
    sizeId?: string;
    extensionId?: string;
    qty?: string;
  }>;
}) => {
  const { colorId, sizeId, extensionId, qty } = await searchParams;

  return (
    <div>
      <span>{colorId}</span>
      <span>{sizeId}</span>
      <span>{extensionId}</span>
      <span>{qty}</span>
    </div>
  );
};

export default page;
