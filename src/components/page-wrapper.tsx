export default function PageWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="page-wrapper flex justify-center">
      <div className="w-full max-w-[63.5rem]">{children}</div>
    </div>
  );
}
