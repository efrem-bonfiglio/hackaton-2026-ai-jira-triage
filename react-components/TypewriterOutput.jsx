import React, { useState, useEffect, useRef } from "react";

const INFRA_TEXT = `Project: sdk-frontend
Confidence: 0.92

Reason:
The issue mentions drag & drop in the
editor sidebar, which belongs to the
embedded editor component.

---

Project: beefree-multiparser
Confidence: 0.45   ← excluded (< 90%)`;

const ANALYZER_TEXT = `Entities:   sidebar, module, editor
Category:   bug
Urgency:    medium
Keywords:   drag-and-drop, sidebar,
            editor, module`;

function Typewriter({ text, renderLine }) {
  const [displayed, setDisplayed] = useState("");
  const [running, setRunning] = useState(false);
  const containerRef = useRef(null);
  const indexRef = useRef(0);
  const timerRef = useRef(null);

  const startAnimation = () => {
    clearInterval(timerRef.current);
    setDisplayed("");
    setRunning(true);
    indexRef.current = 0;
    timerRef.current = setInterval(() => {
      if (indexRef.current >= text.length) {
        clearInterval(timerRef.current);
        setRunning(false);
        return;
      }
      setDisplayed(text.slice(0, indexRef.current + 1));
      indexRef.current += 1;
    }, 28);
  };

  const stopAnimation = () => {
    clearInterval(timerRef.current);
    setRunning(false);
    setDisplayed("");
    indexRef.current = 0;
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startAnimation();
        else stopAnimation();
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => { observer.disconnect(); clearInterval(timerRef.current); };
  }, []);

  return (
    <div ref={containerRef} style={{ fontFamily: "'Fira Code', 'Cascadia Code', 'Courier New', monospace", fontSize: 12, lineHeight: 1.7 }}>
      {displayed.length === 0 ? (
        <span style={{ display: "inline-block", width: 8, height: 14, background: "#7747FF", verticalAlign: "text-bottom", animation: "tw-blink 0.7s steps(1) infinite" }} />
      ) : (
        <>
          {displayed.split("\n").map((line, i) => renderLine(line, i))}
          {running && (
            <span style={{ display: "inline-block", width: 8, height: 14, background: "#7747FF", marginLeft: 1, verticalAlign: "text-bottom", animation: "tw-blink 0.7s steps(1) infinite" }} />
          )}
        </>
      )}
      <style>{`
        @keyframes tw-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function TypewriterOutput() {
  return (
    <Typewriter
      text={INFRA_TEXT}
      renderLine={(line, i) => (
        <div key={i} style={{
          color: /Confidence: 0\.[89]/.test(line) ? "#16a34a"
               : /Confidence: 0\.[0-6]/.test(line) || /excluded/.test(line) ? "#dc2626"
               : /^Project:/.test(line) ? "#7747FF"
               : line === "---" ? "#94a3b8" : "#374151",
          opacity: line === "---" ? 0.4 : 1,
        }}>
          {line || "\u00A0"}
        </div>
      )}
    />
  );
}

export function AnalyzerOutput() {
  return (
    <Typewriter
      text={ANALYZER_TEXT}
      renderLine={(line, i) => {
        const [key, ...rest] = line.split(":");
        const hasKey = rest.length > 0;
        return (
          <div key={i} style={{ color: "#374151" }}>
            {hasKey ? (
              <><span style={{ color: "#7747FF", fontWeight: 700 }}>{key}:</span>{rest.join(":")}</>
            ) : (
              <span style={{ color: "#374151" }}>{line || "\u00A0"}</span>
            )}
          </div>
        );
      }}
    />
  );
}
