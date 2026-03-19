import React, { useState } from "react";

const NODES = [
  {
    id: 0,
    icon: "🐛",
    label: "Jira Ticket",
    description: "A bug ticket is submitted by a customer or support agent.",
    type: "input",
  },
  {
    id: 1,
    icon: "🎯",
    label: "Coordinator",
    description: "Orchestrates the flow: fetches the ticket, then delegates to sub-agents sequentially.",
    type: "agent",
  },
  {
    id: 2,
    icon: "📥",
    label: "Fetch Ticket",
    description: "Reads the Jira ticket via API — title, description, priority, labels.",
    type: "data",
  },
  {
    id: 3,
    icon: "🔬",
    label: "Ticket Analyzer",
    description: "Extracts entities, keywords, urgency, and ticket category from the content.",
    type: "agent",
  },
  {
    id: 4,
    icon: "📚",
    label: "Infra Reader",
    description: "Reads Router → matches keywords to repository docs → assigns confidence scores.",
    type: "agent",
  },
  {
    id: 5,
    icon: "✅",
    label: "Write to Jira",
    description: "Writes structured triage results back to the ticket's AI Triage field.",
    type: "output",
  },
];

const COLORS = {
  input:  { bg: "#f0f0f0", border: "#aaa",    text: "#333",    activeBg: "#e0e7ff", activeBorder: "#6366f1", activeText: "#1e1b4b" },
  agent:  { bg: "#faf5ff", border: "#c4b5fd",  text: "#5b21b6", activeBg: "#7747FF", activeBorder: "#5533bb", activeText: "#fff" },
  data:   { bg: "#f8fafc", border: "#94a3b8",  text: "#475569", activeBg: "#e2e8f0", activeBorder: "#64748b", activeText: "#1e293b" },
  output: { bg: "#f0fdf4", border: "#86efac",  text: "#166534", activeBg: "#22c55e", activeBorder: "#16a34a", activeText: "#fff" },
};

function Node({ node, active, completed, onClick }) {
  const c = COLORS[node.type];
  const isData = node.type === "data";
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        width: 116, height: 72,
        borderRadius: isData ? 6 : 10,
        border: `${isData ? "2px dashed" : "2px solid"} ${active ? c.activeBorder : isData && completed ? "#94a3b8" : !isData && completed ? "#a78bfa" : c.border}`,
        background: active ? c.activeBg : isData && completed ? "#f1f5f9" : !isData && completed ? "#ede9fe" : c.bg,
        color: active ? c.activeText : isData && completed ? "#475569" : !isData && completed ? "#5b21b6" : c.text,
        cursor: "pointer", userSelect: "none",
        transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
        transform: active ? "scale(1.1)" : "scale(1)",
        boxShadow: active
          ? "0 0 12px rgba(100,116,139,0.4), 0 4px 10px rgba(0,0,0,0.10)"
          : isData && completed ? "0 1px 4px rgba(100,116,139,0.15)" : !isData && completed ? "0 2px 6px rgba(119,71,255,0.18)" : "0 1px 3px rgba(0,0,0,0.08)",
        position: "relative", zIndex: active ? 5 : 1,
      }}
    >
      <span style={{ fontSize: 20, lineHeight: 1 }}>{node.icon}</span>
      <span style={{ fontSize: 10, fontWeight: 700, marginTop: 3, textAlign: "center", lineHeight: 1.2, padding: "0 4px" }}>
        {node.label}
      </span>
      <span style={{ fontSize: 8, opacity: active ? 0.85 : 0.55, marginTop: 2, textAlign: "center", lineHeight: 1.2, padding: "0 6px" }}>
        {node.subtitle}
      </span>
      {active && (
        <span style={{
          position: "absolute", inset: -6, borderRadius: isData ? 10 : 15,
          border: `2px solid ${isData ? "rgba(100,116,139,0.35)" : "rgba(119,71,255,0.35)"}`,
          animation: "pring 1.5s ease-in-out infinite", pointerEvents: "none",
        }} />
      )}
    </div>
  );
}

function HConnector({ active }) {
  const color = active ? "#7747FF" : "#d1d5db";
  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: 36, flexShrink: 0 }}>
      <div style={{ height: 2, flex: 1, background: color, transition: "background 0.4s ease" }} />
      <div style={{
        width: 0, height: 0, flexShrink: 0,
        borderTop: "5px solid transparent", borderBottom: "5px solid transparent",
        borderLeft: `6px solid ${color}`, transition: "border-left-color 0.4s ease",
      }} />
    </div>
  );
}

export default function WorkflowAnimation() {
  const [step, setStep] = useState(0);
  const active = (id) => step === id;
  const done   = (id) => step > id;

  // Cluster geometry (px)
  const nw = 116, nh = 72, hgap = 40, vgap = 40, padL = 28, padT = 18;
  const cx1 = padL + nw / 2;              // Coordinator & Infra  x = 80
  const cx2 = padL + nw + hgap + nw / 2; // Fetch & Analyzer     x = 224
  const cy1 = padT + nh / 2;             // Coordinator & Fetch  y = 48
  const cy2 = padT + nh + vgap + nh / 2; // Analyzer & Infra     y = 152
  const clW = padL + nw + hgap + nw + padL; // 308
  const clH = padT + nh + vgap + nh + padT; // 200

  const lineColor = (fromStep) => step >= fromStep ? "#7747FF" : "#d1d5db";
  const markerId  = (fromStep) => step >= fromStep ? "wf-arr-on" : "wf-arr-off";
  const clusterActive = step >= 1 && step <= 4;

  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 24, fontFamily: "inherit", justifyContent: "center" }}>

      {/* Horizontal diagram */}
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 0 }}>

        {/* Jira Ticket — left */}
        <Node node={NODES[0]} active={active(0)} completed={done(0)} onClick={() => setStep(0)} />

        <HConnector active={step >= 1} />

        {/* ── Cluster box ── */}
        <div style={{
          width: clW, borderRadius: 14,
          border: `2px solid ${clusterActive ? "#7747FF" : "#c4b5fd"}`,
          background: "#faf5ff", position: "relative",
          transition: "border-color 0.4s ease",
          boxShadow: clusterActive ? "0 0 24px rgba(119,71,255,0.18)" : "none",
        }}>
          {/* Label badge */}
          <div style={{
            position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
            background: clusterActive ? "#7747FF" : "#faf5ff",
            color: clusterActive ? "#fff" : "#7747FF",
            border: "2px solid #c4b5fd", borderRadius: 20,
            padding: "2px 14px", fontSize: 10, fontWeight: 700,
            whiteSpace: "nowrap", letterSpacing: "0.04em",
            transition: "all 0.4s ease",
          }}>
            🤖 Multi-Agent System
          </div>

          {/* SVG canvas for nodes + arrows */}
          <div style={{ position: "relative", margin: "22px 0 14px 0", height: clH }}>
            <svg
              style={{ position: "absolute", top: 0, left: 0, overflow: "visible", pointerEvents: "none" }}
              width={clW} height={clH}
              viewBox={`0 0 ${clW} ${clH}`}
            >
              <defs>
                <marker id="wf-arr-on"  markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                  <path d="M0,0 L7,3.5 L0,7 Z" fill="#7747FF" />
                </marker>
                <marker id="wf-arr-off" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                  <path d="M0,0 L7,3.5 L0,7 Z" fill="#d1d5db" />
                </marker>
              </defs>

              {/* Coordinator → Fetch Ticket */}
              <line x1={cx1 + nw/2} y1={cy1} x2={cx2 - nw/2} y2={cy1}
                stroke={lineColor(1)} strokeWidth={2} markerEnd={`url(#${markerId(1)})`}
                style={{ transition: "stroke 0.4s ease" }} />
              {/* Fetch Ticket → Ticket Analyzer */}
              <line x1={cx2} y1={cy1 + nh/2} x2={cx2} y2={cy2 - nh/2}
                stroke={lineColor(2)} strokeWidth={2} markerEnd={`url(#${markerId(2)})`}
                style={{ transition: "stroke 0.4s ease" }} />
              {/* Ticket Analyzer → Infra Reader */}
              <line x1={cx2 - nw/2} y1={cy2} x2={cx1 + nw/2} y2={cy2}
                stroke={lineColor(3)} strokeWidth={2} markerEnd={`url(#${markerId(3)})`}
                style={{ transition: "stroke 0.4s ease" }} />
            </svg>

            {/* Nodes */}
            {[
              { node: NODES[1], cx: cx1, cy: cy1 }, // Coordinator   top-left
              { node: NODES[2], cx: cx2, cy: cy1 }, // Fetch Ticket  top-right
              { node: NODES[3], cx: cx2, cy: cy2 }, // Analyzer      bottom-right
              { node: NODES[4], cx: cx1, cy: cy2 }, // Infra Reader  bottom-left
            ].map(({ node, cx, cy }) => (
              <div key={node.id} style={{ position: "absolute", left: cx - nw/2, top: cy - nh/2 }}>
                <Node node={node} active={active(node.id)} completed={done(node.id)} onClick={() => setStep(node.id)} />
              </div>
            ))}
          </div>
        </div>

        <HConnector active={step >= 5} />

        {/* Write to Jira — right */}
        <Node node={NODES[5]} active={active(5)} completed={done(5)} onClick={() => setStep(5)} />

      </div>

      {/* Description panel — right side */}
      <div style={{
        width: 200,
        alignSelf: "center",
        padding: "14px 16px",
        minHeight: 100,
        background: step >= 0 ? "linear-gradient(135deg, #faf5ff, #ede9fe)" : "#f9fafb",
        borderRadius: 12,
        border: `1px solid ${step >= 0 ? "#c4b5fd" : "#e5e7eb"}`,
        fontSize: 12, color: "#374151", lineHeight: 1.7,
        transition: "all 0.4s ease",
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        {step >= 0 ? (
          <div key={step} style={{ animation: "wf-fadein 0.3s ease" }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#5b21b6", marginBottom: 6 }}>
              {NODES[step].icon} {NODES[step].label}
            </div>
            <div style={{ opacity: 0.8 }}>{NODES[step].description}</div>
          </div>
        ) : (
          <span style={{ opacity: 0.45, fontStyle: "italic", fontSize: 11 }}>Click a node to see details</span>
        )}
      </div>

      <style>{`
        @keyframes pring {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 0.85; transform: scale(1.05); }
        }
        @keyframes wf-fadein {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
