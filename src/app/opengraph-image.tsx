import { ImageResponse } from "next/og";
import { hero, site } from "@/content/content";

export const alt = site.title;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0b0d",
          color: "#ecedee",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          border: "2px solid #181b21",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                backgroundColor: "rgba(198,243,107,0.14)",
                border: "2px solid #c6f36b",
                color: "#c6f36b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                fontWeight: 700,
              }}
            >
              RA
            </div>
            <div style={{ fontSize: "24px", color: "#9ba1aa" }}>
              {hero.eyebrow}
            </div>
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#c6f36b",
              border: "1px solid rgba(198,243,107,0.45)",
              borderRadius: "999px",
              padding: "8px 20px",
            }}
          >
            github.com/Mahoragaa
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              fontSize: "38px",
              fontWeight: 600,
              color: "#9ba1aa",
              lineHeight: 1.25,
            }}
          >
            {hero.headline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: "24px",
            fontSize: "22px",
            color: "#9ba1aa",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ color: "#c6f36b", fontWeight: 700 }}>
              {hero.proof.metric}
            </span>
            <span>· Production PL/SQL @ Infosys (Pfizer L3)</span>
          </div>
          <div style={{ color: "#ecedee" }}>
            AWS · Next.js · LangGraph · PyTorch
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
