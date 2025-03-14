import React from "react";
import Header from "./components/header";
import HeroSection from "@/components/sections/hero-section";
import ShopByCategory from "@/components/sections/shop-by-category";
import FeaturedProducts from "@/components/sections/featured-products";

const page = () => {
  return (
    <main>
      <Header />
      <HeroSection />
      <ShopByCategory />
      <FeaturedProducts />
    </main>
  );
};

export default page;
