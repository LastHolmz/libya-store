import React from "react";
import Header from "./components/header";
import HeroSection from "@/components/sections/hero-section";
import ShopByCategory from "@/components/sections/shop-by-category";
import FeaturedProducts from "@/components/sections/featured-products";
import Footer from "./components/footer";
import { getCategories } from "@/database/categories";

const page = async () => {
  const categories = await getCategories({});
  return (
    <main>
      <Header />
      <HeroSection />
      <ShopByCategory categories={categories} />
      <FeaturedProducts />
      <Footer />
    </main>
  );
};

export default page;
