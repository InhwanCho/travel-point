export default function PageLayout({
  children,
}:
  {
    children: React.ReactNode;
  }) {
  return (
    <section className="max-w-4xl xl:max-w-5xl px-4 sm:px-6 xl:px-0 mx-auto">
      <div className="flex flex-col flex-1 min-h-dvh">
        {children}        
      </div>
    </section>
  );
}
