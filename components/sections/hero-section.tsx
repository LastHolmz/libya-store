import Image from "next/image";
import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { CustomLink } from "../custom-link";

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 via-muted/25 to-background py-24 md:py-32">
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[length:20px_20px]"></div>
      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                مجموعة جديدة متاحة
              </div>
              <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:leading-[1.1]">
                وجهتك الشاملة لكل ما يخص{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  التكنولوجيا
                </span>
              </h1>
              <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
                اكتشف منتجات متميزة بأسعار تنافسية، مع شحن سريع وخدمة عملاء
                استثنائية.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              {/* <a href="/products"> */}
              <CustomLink
                href="#"
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 rounded-md has-[>svg]:px-4 h-12 gap-1.5 px-8"
              >
                تسوق الآن
                <FaLongArrowAltLeft />
              </CustomLink>
              {/* </a> */}
              {/* <a href="/showcase"> */}
              <CustomLink
                href="#"
                data-slot="CustomLink"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground rounded-md has-[>svg]:px-4 h-12 px-8"
              >
                عرض المنتجات
              </CustomLink>
              {/* </a> */}
            </div>
            <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-truck h-5 w-5 text-primary/70"
                >
                  <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                  <path d="M15 18H9"></path>
                  <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                  <circle cx="17" cy="18" r="2"></circle>
                  <circle cx="7" cy="18" r="2"></circle>
                </svg>
                <span>شحن مجاني للطلبات فوق 50$</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-clock h-5 w-5 text-primary/70"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>دعم العملاء 24/7</span>
              </div>
            </div>
          </div>
          <div className="relative mx-auto hidden aspect-square w-full max-w-md overflow-hidden rounded-xl border lg:block">
            <div className="absolute inset-0 z-10 bg-gradient-to-tr from-primary/20 via-transparent to-transparent"></div>
            <Image
              alt="تجربة التسوق"
              src="/images/cover.webp"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
    </section>
  );
};

export default HeroSection;
