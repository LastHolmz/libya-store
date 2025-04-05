import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="w-full" dir="rtl">
      <hr className="h-px bg-neutral-200 dark:bg-neutral-800 border-0 my-12" />
      <div className="flex justify-between px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem]">
        {/* Left Section */}
        <div className="mb-6 hidden md:mb-0 md:block">
          <span className="flex flex-col">
            <h2 className="whitespace-nowrap text-sm font-semibold uppercase">
              المتجر
            </h2>
            <span className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              © 2025 المتجر™. جميع الحقوق محفوظة.
            </span>
          </span>
        </div>

        {/* Right Section */}
        <div className="text-center phone-only:w-full justify-evenly grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
          {/* Legal Links */}
          <div>
            <h2 className="mb-3 text-sm uppercase">القانوني</h2>
            <ul className="block space-y-1">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm transition duration-300 text-muted-foreground hover:text-foreground"
                >
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm transition duration-300 text-muted-foreground hover:text-foreground"
                >
                  الشروط والأحكام
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h2 className="mb-3 text-sm uppercase">الموارد</h2>
            <ul className="block space-y-1">
              <li>
                <Link
                  href="/blog"
                  className="text-sm transition duration-300 text-muted-foreground hover:text-foreground"
                >
                  المدونة
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm transition duration-300 text-muted-foreground hover:text-foreground"
                >
                  من نحن
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm transition duration-300 text-muted-foreground hover:text-foreground"
                >
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h2 className="mb-3 text-sm uppercase">الدعم</h2>
            <ul className="block space-y-1">
              <li>
                <Link
                  href="/telegram"
                  className="text-sm transition duration-300 text-muted-foreground hover:text-foreground"
                >
                  تيليجرام
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm transition duration-300 text-muted-foreground hover:text-foreground"
                >
                  الأسئلة الشائعة
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <hr className="h-px my-4 bg-neutral-200 dark:bg-neutral-800 border-0 mt-8 mb-6" />
      <div className="mb-6 flex justify-center gap-4 items-center text-muted-foreground">
        <a
          href="https://twitter.com/sesto_dev"
          target="_blank"
          rel="noreferrer"
          aria-label="صفحة تويتر"
        >
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
            className="lucide lucide-twitter h-4"
          >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
          </svg>
        </a>
        <a
          href="https://github.com/sesto-dev"
          target="_blank"
          rel="noreferrer"
          aria-label="حساب GitHub"
        >
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
            className="lucide lucide-github h-4"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
            <path d="M9 18c-4.51 2-5-2-7-2"></path>
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
