import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useCurrentPage() {
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState<string>("");
  const [pageSubtitle, setPageSubtitle] = useState<string>("");

  useEffect(() => {
    switch (pathname) {
      default:
        setPageTitle("Mangoes");
        setPageSubtitle("");
        break;
    }
  }, [pathname]);

  return { title: pageTitle, subtitle: pageSubtitle };
}
