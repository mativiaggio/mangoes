import React from "react";

export default function PageWrapper({
  children,
  level2,
}: Readonly<{
  children: React.ReactNode;
  level2?: boolean;
}>) {
  return (
    <div className="page-wrapper flex justify-center">
      <div className="w-full flex justify-between">
        {level2 ? (
          <div className="w-full flex justify-center">
            <div className="w-full xl:w-3/6">{children}</div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
