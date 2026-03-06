import type { ReactNode } from "react";

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash);
}

export function BlogImageTemplate({
  title,
  tags,
  slug,
}: {
  title: string;
  tags: string[];
  slug: string;
}): ReactNode {
  const hash = hashCode(slug);

  // Position gradient blobs based on slug hash for per-post uniqueness
  const blob1X = 10 + (hash % 40); // 10-50% from left
  const blob1Y = 10 + ((hash >> 4) % 40); // 10-50% from top
  const blob2X = 50 + ((hash >> 8) % 40); // 50-90% from left
  const blob2Y = 40 + ((hash >> 12) % 40); // 40-80% from top

  // Vary hues slightly per post
  const hueShift = hash % 40; // 0-39 degree shift

  return (
    <div
      style={{
        width: 1600,
        height: 900,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0a0a0a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gradient blob 1 - purple/blue */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, hsla(${250 + hueShift}, 70%, 40%, 0.35) 0%, hsla(${220 + hueShift}, 60%, 30%, 0.15) 50%, transparent 70%)`,
          left: `${blob1X}%`,
          top: `${blob1Y}%`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Gradient blob 2 - blue/cyan */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, hsla(${200 + hueShift}, 70%, 45%, 0.3) 0%, hsla(${180 + hueShift}, 60%, 35%, 0.1) 50%, transparent 70%)`,
          left: `${blob2X}%`,
          top: `${blob2Y}%`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Title */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 120px",
          gap: 40,
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: 60,
            fontWeight: 300,
            textAlign: "center",
            lineHeight: 1.3,
            maxWidth: 1200,
            display: "flex",
          }}
        >
          {title}
        </div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: 22,
                fontWeight: 400,
                padding: "8px 20px",
                borderRadius: 100,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Branding */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 60,
          color: "#71717a",
          fontSize: 18,
          fontWeight: 400,
          display: "flex",
        }}
      >
        aiwebhub.io
      </div>
    </div>
  );
}
