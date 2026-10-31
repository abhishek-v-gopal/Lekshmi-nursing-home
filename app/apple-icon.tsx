import { ImageResponse } from "next/og";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "#0B1E21", color: "#F3F5F0" }}>
        <div style={{ fontSize: 64, fontFamily: "serif", fontWeight: 600 }}>LNH</div>
        <div style={{ width: 70, height: 6, background: "#D4AF5F", marginTop: 8 }} />
      </div>
    ),
    size
  );
}
