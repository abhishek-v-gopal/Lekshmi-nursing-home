import type { Dict } from "@/lib/i18n";
export default function Hours({ d }: { d: Dict }) {
  return (
    <div>
      <dl>
        {d.hours.map((h) => (
          <div key={h.k} className="flex flex-wrap justify-between gap-x-6 border-b border-line py-4">
            <dt className="text-muted">{h.k}</dt>
            <dd className="font-display text-xl">{h.v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-sm text-muted">{d.hoursNote}</p>
    </div>
  );
}
