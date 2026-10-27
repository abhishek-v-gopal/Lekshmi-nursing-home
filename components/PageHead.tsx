export default function PageHead({ title, lead }: { title: string; lead: string }) {
  return (
    <header className="wrap pb-14 pt-16 md:pb-20 md:pt-28">
      <div className="mb-6 h-1 w-14 bg-gold" />
      <h1 className="max-w-4xl text-4xl sm:text-5xl md:text-7xl">{title}</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted md:text-xl">{lead}</p>
    </header>
  );
}
