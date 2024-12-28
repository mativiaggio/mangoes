import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import MobileBottomNavbarMore from "../buttons/mobile/mobile-bottom-navbar-more";
interface Props {
  width?: number;
}
export const MobileBottomNavbar = ({ width }: Props) => {
  const pathname = usePathname();

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 bg-main z-49 border print:hidden !w-[${width}px] border-t z-[1]`}>
      <ul className={`flex justify-between !w-[${width}px]`}>
        <li className="w-1/5">
          <Link
            className="`w-full flex flex-col gap-1 font-bold items-center rounded-full transition-all py-[1rem]"
            href="/">
            <div
              className={`w-full flex flex-col gap-1 font-bold items-center rounded-full transition-all ${
                pathname === "/"
                  ? "text-main-oranger dark:text-main-orange"
                  : "text-inactive-item"
              }`}>
              <Home
                size={28}
                className={
                  pathname === "/"
                    ? "text-main-oranger dark:text-main-orange"
                    : "text-inactive-item"
                }
              />
              <span className="text-xs">Inicio</span>
            </div>
          </Link>
        </li>
        <li className="w-1/5">
          <MobileBottomNavbarMore />
        </li>
      </ul>
    </nav>
  );
};
