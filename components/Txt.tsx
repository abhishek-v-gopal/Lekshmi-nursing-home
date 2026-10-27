// Renders text; anything written as [[like this]] is shown as a highlighted placeholder.
export default function Txt({ s }: { s?: string | null }) {
  const text = s ?? "";
  return (
    <>
      {text.split(/(\[\[.*?\]\])/g).map((part, i) =>
        part.startsWith("[[") ? (
          <span key={i} className="ph" title="Placeholder: replace in content/site.json">{part.slice(2, -2)}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
