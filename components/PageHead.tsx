export default function PageHead({ title, lead }: { title: string; lead: string }) {
  return (
    <header className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute -right-32 -top-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-gold/15 blur-3xl" />
      <div aria-hidden="true" className="absolute -left-40 top-10 -z-10 h-[22rem] w-[22rem] rounded-full bg-accent/10 blur-3xl" />
      <div className="wrap pb-14 pt-16 md:pb-20 md:pt-28">
        <div className="rise mb-6 h-1 w-14 rounded-full bg-gold" />
        <h1 className="rise max-w-4xl text-4xl sm:text-5xl md:text-7xl" style={{ animationDelay: "100ms" }}>{title}</h1>
        <p className="rise mt-6 max-w-2xl text-lg text-muted md:text-xl" style={{ animationDelay: "200ms" }}>{lead}</p>
      </div>
    </header>
  );
}
