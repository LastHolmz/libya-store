import React, { ReactNode } from "react";
import Header from "./components/header";

const layout = async ({
  children,
}: // searchParams,
{
  children: ReactNode;
  // searchParams?: Promise<{ header?: string }>;
}) => {
  // const header = (await searchParams)?.header;
  return <div>{children}</div>;
};

export default layout;
