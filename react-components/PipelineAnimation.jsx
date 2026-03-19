import React from "react";

const STEPS = [
  { id: 1, label: "Trigger",      output: "issue URL" },
  { id: 2, label: "Fetch\nIssue", output: "issue data" },
  { id: 3, label: "Triage",       output: "repo list\n+ action plan" },
  { id: 4, label: "Spec",         output: "spec per\nrepo" },
  { id: 5, label: "Code",         output: "code\nchanges" },
  { id: 6, label: "Review",       output: "validated\nchanges" },
  { id: 7, label: "PR",           output: "PR link" },
];

const purple = "#7747FF";
const purpleFaint = "#c4b5fd";
const purpleBg = "#faf5ff";

function Arrow() {
  return (
    <div style={{ display: "flex", alignItems: "center", flexShrink: 0, margin: "0 2px" }}>
      <div style={{ width: 16, height: 2, background: purpleFaint }} />
      <div style={{
        width: 0, height: 0,
        borderTop: "5px solid transparent",
        borderBottom: "5px solid transparent",
        borderLeft: `6px solid ${purpleFaint}`,
      }} />
    </div>
  );
}

function Step({ step }) {
  const lines = step.label.split("\n");
  const outputLines = step.output.split("\n");
  const highlight = step.id === 3;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
      {/* Box */}
      <div style={{
        width: "100%",
        maxWidth: 90,
        height: 64,
        borderRadius: 8,
        border: `2px solid ${highlight ? purple : purpleFaint}`,
        background: highlight ? purple : purpleBg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        transform: highlight ? "scale(1.1)" : "scale(1)",
        position: "relative",
        zIndex: highlight ? 2 : 1,
        boxShadow: highlight ? "0 0 18px rgba(119,71,255,0.5)" : "none",
      }}>
        <span style={{ fontSize: 9, color: highlight ? "rgba(255,255,255,0.6)" : "#9ca3af", fontWeight: 600 }}>{step.id}</span>
        <div style={{ textAlign: "center", lineHeight: 1.3 }}>
          {lines.map((l, i) => (
            <div key={i} style={{ fontSize: 10, fontWeight: 700, color: highlight ? "#fff" : "#5b21b6" }}>{l}</div>
          ))}
        </div>
        {highlight && (
          <span style={{
            position: "absolute", inset: -8, borderRadius: 14,
            border: "2px solid rgba(119,71,255,0.35)",
            animation: "pring 1.5s ease-in-out infinite",
            pointerEvents: "none",
          }} />
        )}
      </div>

      {/* Down arrow */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 2, height: 10, background: purpleFaint }} />
        <div style={{
          width: 0, height: 0,
          borderLeft: "4px solid transparent",
          borderRight: "4px solid transparent",
          borderTop: `5px solid ${purpleFaint}`,
        }} />
      </div>

      {/* Output label */}
      <div style={{ textAlign: "center" }}>
        {outputLines.map((l, i) => (
          <div key={i} style={{ fontSize: 9, color: "#6b7280", lineHeight: 1.4 }}>{l}</div>
        ))}
      </div>
    </div>
  );
}

export default function PipelineAnimation() {
  return (
    <div style={{ fontFamily: "inherit", width: "100%", padding: "0 4px" }}>

      {/* Orchestration layer */}
      <div style={{
        width: "100%",
        border: `2px solid ${purple}`,
        borderRadius: 10,
        background: "linear-gradient(135deg, #ede9fe, #faf5ff)",
        padding: "10px 20px",
        textAlign: "center",
        marginBottom: 4,
      }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: purple, letterSpacing: "0.08em" }}>
          ORCHESTRATION LAYER
        </div>
        <div style={{ fontSize: 10, color: "#7c3aed", opacity: 0.7, marginTop: 2 }}>
          remote execution · status tracking · error handling
        </div>
      </div>

      {/* Down arrow from orchestration */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: 2, height: 14, background: purple }} />
          <div style={{
            width: 0, height: 0,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderTop: `8px solid ${purple}`,
          }} />
        </div>
      </div>

      <style>{`
        @keyframes pring {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 0.85; transform: scale(1.05); }
        }
      `}</style>

      {/* Pipeline steps */}
      <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", width: "100%" }}>
        {STEPS.map((step, i) => (
          <React.Fragment key={step.id}>
            <Step step={step} />
            {i < STEPS.length - 1 && (
              <div style={{ display: "flex", alignItems: "flex-start", paddingTop: 30, flexShrink: 0 }}>
                <Arrow />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
