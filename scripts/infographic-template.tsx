import type { ReactNode } from "react";

/**
 * Standalone "The Six Agentic Workflow Patterns" infographic.
 * Rendered at a true 21:9 ratio (2100x900) so it fills the blog hero
 * container (aspect-[21/9], object-cover) with no cropping.
 *
 * Everything is built from styled <div>s (rounded nodes + thin line
 * segments, absolutely positioned) and Inter text only — no unicode
 * glyphs, emoji, diagonals, or transforms, all of which Satori renders
 * unreliably.
 */

// Palette (matches the site's dark theme / gradient hues)
const NODE_FILL = "rgba(255,255,255,0.06)";
const NODE_BORDER = "rgba(255,255,255,0.22)";
const PURPLE_FILL = "rgba(150,130,255,0.16)";
const PURPLE_BORDER = "rgba(150,130,255,0.60)";
const CYAN_FILL = "rgba(90,200,255,0.16)";
const CYAN_BORDER = "rgba(90,200,255,0.75)";
const LINE = "rgba(255,255,255,0.28)";
const CYAN_LINE = "rgba(90,200,255,0.55)";

type Accent = "plain" | "purple" | "cyan";

function fillFor(a: Accent): string {
  if (a === "purple") return PURPLE_FILL;
  if (a === "cyan") return CYAN_FILL;
  return NODE_FILL;
}
function borderFor(a: Accent): string {
  if (a === "purple") return PURPLE_BORDER;
  if (a === "cyan") return CYAN_BORDER;
  return NODE_BORDER;
}

function node(
  key: string,
  left: number,
  top: number,
  width: number,
  height: number,
  accent: Accent = "plain"
): ReactNode {
  return (
    <div
      key={key}
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        borderRadius: 9,
        background: fillFor(accent),
        border: `1px solid ${borderFor(accent)}`,
        display: "flex",
      }}
    />
  );
}

function hLine(
  key: string,
  left: number,
  top: number,
  width: number,
  color: string = LINE
): ReactNode {
  return (
    <div
      key={key}
      style={{
        position: "absolute",
        left,
        top,
        width,
        height: 2,
        background: color,
        display: "flex",
      }}
    />
  );
}

function vLine(
  key: string,
  left: number,
  top: number,
  height: number,
  color: string = LINE
): ReactNode {
  return (
    <div
      key={key}
      style={{
        position: "absolute",
        left,
        top,
        width: 2,
        height,
        background: color,
        display: "flex",
      }}
    />
  );
}

function dot(
  key: string,
  left: number,
  top: number,
  size: number,
  color: string
): ReactNode {
  return (
    <div
      key={key}
      style={{
        position: "absolute",
        left,
        top,
        width: size,
        height: size,
        borderRadius: size / 2,
        background: color,
        display: "flex",
      }}
    />
  );
}

// Each diagram lives inside a fixed 250x180 relative stage.
function stage(children: ReactNode[]): ReactNode {
  return (
    <div
      style={{
        position: "relative",
        width: 250,
        height: 180,
        display: "flex",
      }}
    >
      {children}
    </div>
  );
}

// 1. Prompt chaining — three nodes in order, with a "gate" between two of them.
function promptChaining(): ReactNode {
  return stage([
    hLine("c1", 56, 89, 60),
    hLine("c2", 156, 89, 38),
    dot("gate", 130, 83, 14, CYAN_BORDER),
    node("a", 22, 76, 34, 28, "cyan"),
    node("b", 116, 76, 34, 28, "plain"),
    node("c", 194, 76, 34, 28, "plain"),
  ]);
}

// 2. Routing — one router node fanning out to three specialists.
function routing(): ReactNode {
  return stage([
    node("src", 16, 76, 34, 28, "cyan"),
    hLine("h", 50, 89, 44),
    vLine("bus", 94, 40, 100, CYAN_LINE),
    hLine("t1", 94, 39, 56),
    hLine("t2", 94, 89, 56),
    hLine("t3", 94, 139, 56),
    node("n1", 150, 26, 40, 26, "purple"),
    node("n2", 150, 76, 40, 26, "purple"),
    node("n3", 150, 126, 40, 26, "purple"),
  ]);
}

// 3. Parallelization — fan-out to parallel workers, then fan-in.
function parallelization(): ReactNode {
  return stage([
    node("in", 8, 76, 32, 28, "cyan"),
    hLine("oh", 40, 89, 28),
    vLine("ob", 68, 39, 100, CYAN_LINE),
    hLine("o1", 68, 39, 40),
    hLine("o2", 68, 89, 40),
    hLine("o3", 68, 139, 40),
    node("p1", 108, 27, 34, 24, "purple"),
    node("p2", 108, 77, 34, 24, "purple"),
    node("p3", 108, 127, 34, 24, "purple"),
    hLine("i1", 142, 39, 40),
    hLine("i2", 142, 89, 40),
    hLine("i3", 142, 139, 40),
    vLine("ib", 182, 39, 100, CYAN_LINE),
    hLine("ih", 182, 89, 28),
    node("out", 210, 76, 32, 28, "cyan"),
  ]);
}

// 4. Orchestrator-workers — a lead node above three worker nodes.
function orchestrator(): ReactNode {
  return stage([
    node("lead", 105, 26, 44, 28, "cyan"),
    vLine("down", 126, 54, 42, CYAN_LINE),
    hLine("bus", 56, 96, 142, CYAN_LINE),
    vLine("w1", 56, 96, 26),
    vLine("w2", 126, 96, 26),
    vLine("w3", 196, 96, 26),
    node("n1", 38, 122, 38, 30, "purple"),
    node("n2", 108, 122, 38, 30, "purple"),
    node("n3", 178, 122, 38, 30, "purple"),
  ]);
}

// 5. Evaluator-optimizer — generate -> evaluate, with a feedback loop back.
function evaluatorOptimizer(): ReactNode {
  return stage([
    node("gen", 28, 74, 66, 34, "cyan"),
    node("eval", 156, 74, 66, 34, "purple"),
    // forward path (top)
    hLine("fwd", 94, 80, 62),
    // feedback loop (bottom U)
    vLine("ld", 188, 108, 30, CYAN_LINE),
    hLine("lb", 61, 138, 127, CYAN_LINE),
    vLine("lu", 61, 108, 30, CYAN_LINE),
    dot("fb", 118, 132, 12, CYAN_BORDER),
  ]);
}

// 6. Autonomous agent — a single agent looping against its environment/tools.
function autonomousAgent(): ReactNode {
  return stage([
    // loop ring
    <div
      key="ring"
      style={{
        position: "absolute",
        left: 52,
        top: 42,
        width: 146,
        height: 96,
        borderRadius: 20,
        border: `2px solid ${CYAN_LINE}`,
        display: "flex",
      }}
    />,
    node("agent", 92, 72, 66, 36, "cyan"),
    // tool / environment touch-points on the loop
    dot("t1", 46, 56, 14, PURPLE_BORDER),
    dot("t2", 46, 118, 14, PURPLE_BORDER),
    dot("t3", 192, 86, 14, PURPLE_BORDER),
  ]);
}

const PATTERNS: {
  num: string;
  name: string;
  caption: string;
  diagram: () => ReactNode;
}[] = [
  {
    num: "01",
    name: "Prompt Chaining",
    caption: "Checkable steps, in order",
    diagram: promptChaining,
  },
  {
    num: "02",
    name: "Routing",
    caption: "Each request to the right specialist",
    diagram: routing,
  },
  {
    num: "03",
    name: "Parallelization",
    caption: "Subtasks run side by side",
    diagram: parallelization,
  },
  {
    num: "04",
    name: "Orchestrator-Workers",
    caption: "A lead agent delegates",
    diagram: orchestrator,
  },
  {
    num: "05",
    name: "Evaluator-Optimizer",
    caption: "Generate, critique, repeat",
    diagram: evaluatorOptimizer,
  },
  {
    num: "06",
    name: "Autonomous Agent",
    caption: "Acts on real feedback in a loop",
    diagram: autonomousAgent,
  },
];

export function PatternsInfographic(): ReactNode {
  return (
    <div
      style={{
        width: 2100,
        height: 900,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0a0a0a",
        position: "relative",
        overflow: "hidden",
        padding: "64px 70px",
      }}
    >
      {/* Gradient blobs */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, hsla(255,70%,42%,0.30) 0%, hsla(225,60%,30%,0.12) 50%, transparent 70%)",
          left: "8%",
          top: "0%",
          transform: "translate(-50%, -40%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 820,
          height: 820,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, hsla(200,75%,46%,0.26) 0%, hsla(185,60%,35%,0.10) 50%, transparent 70%)",
          left: "92%",
          top: "100%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          marginBottom: 44,
        }}
      >
        <div
          style={{
            display: "flex",
            color: "rgba(90,200,255,0.9)",
            fontSize: 22,
            fontWeight: 400,
            letterSpacing: 4,
          }}
        >
          AIWEBHUB · AI AGENTS
        </div>
        <div
          style={{
            display: "flex",
            color: "#ffffff",
            fontSize: 64,
            fontWeight: 300,
            textAlign: "center",
          }}
        >
          The Six Agentic Workflow Patterns
        </div>
        <div
          style={{
            display: "flex",
            color: "rgba(255,255,255,0.55)",
            fontSize: 25,
            fontWeight: 400,
          }}
        >
          How modern AI agents get work done · based on Anthropic's agent taxonomy
        </div>
      </div>

      {/* Pattern cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 20,
          flex: 1,
        }}
      >
        {PATTERNS.map((p) => (
          <div
            key={p.num}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
              padding: "26px 16px 24px 16px",
              borderRadius: 22,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {p.diagram()}
            <div
              style={{
                display: "flex",
                color: "rgba(90,200,255,0.85)",
                fontSize: 17,
                fontWeight: 400,
                letterSpacing: 2,
                marginTop: 10,
              }}
            >
              {p.num}
            </div>
            <div
              style={{
                display: "flex",
                color: "#ffffff",
                fontSize: 27,
                fontWeight: 300,
                textAlign: "center",
                marginTop: 6,
                lineHeight: 1.2,
              }}
            >
              {p.name}
            </div>
            <div
              style={{
                display: "flex",
                color: "rgba(255,255,255,0.5)",
                fontSize: 17,
                fontWeight: 400,
                textAlign: "center",
                marginTop: 8,
                lineHeight: 1.3,
              }}
            >
              {p.caption}
            </div>
          </div>
        ))}
      </div>

      {/* Branding */}
      <div
        style={{
          position: "absolute",
          bottom: 34,
          right: 60,
          color: "#71717a",
          fontSize: 20,
          fontWeight: 400,
          display: "flex",
        }}
      >
        aiwebhub.io
      </div>
    </div>
  );
}
