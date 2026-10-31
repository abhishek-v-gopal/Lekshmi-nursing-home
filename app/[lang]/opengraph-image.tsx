import { ImageResponse } from "next/og";
export const alt = "Lekshmi Nursing Home, Ramankari, Kuttanad";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", width: "100%", height: "100%", background: "#0B1E21", color: "#F3F5F0", padding: 80 }}>
        <div style={{ width: 80, height: 4, background: "#D4AF5F", marginBottom: 32 }} />
        <div style={{ fontSize: 84 }}>Lekshmi Nursing Home</div>
        <div style={{ fontSize: 36, color: "#A9BAB6", marginTop: 16 }}>Ramankari, Kuttanad. Dr. M S Naveenan MBBS. Fifty years of care.</div>
      </div>
    ),
    size
  );
}
