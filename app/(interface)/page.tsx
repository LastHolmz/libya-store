import React from "react";
import Header from "./components/header";
import HeroSection from "@/components/sections/hero-section";
import ShopByCategory from "@/components/sections/shop-by-category";
import FeaturedProducts from "@/components/sections/featured-products";
import Footer from "./components/footer";

const page = () => {
  return (
    <main>
      <Header />
      <HeroSection />
      <ShopByCategory />
      <FeaturedProducts />
      <Footer />
    </main>
  );
};

export default page;
