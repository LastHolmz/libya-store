import { Metadata } from "next";
import Header from "./components/header";
import NavigationRail, { DashboardHeader } from "./components/naviagation-rail";
export const metadata: Metadata = {
  title: {
    default: "لوحة التحكم",
    template: "%s < لوحة التحكم < Our Gym",
  },
};
const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      dir="rtl"
      className="flex relative flex-start gap-1 min-h-screen bg-secondary"
    >
      <section className=" bg-secondary phone-only:hidden">
        <NavigationRail />
      </section>

      <section className="flex-1 bg-background max-w-full">
        <div className="phone-only:hidden">
          <Header />
        </div>
        <DashboardHeader />
        <main>{children}</main>
      </section>
    </main>
  );
};
export default DashboardLayout;
