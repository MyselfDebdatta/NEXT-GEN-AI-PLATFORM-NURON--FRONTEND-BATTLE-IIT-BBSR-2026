import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";

const CODE_SEQUENCE = [
  "import { Agent } from '@nuron/sdk';",
  "import { stripe, postgres } from './integrations';",
  "",
  "const reconcileAgent = new Agent({",
  "  name: 'Billing Reconciliation',",
  "  model: 'gpt-4-turbo',",
  "  tools: [stripe, postgres]",
  "});",
  "",
  "await reconcileAgent.run({",
  "  task: 'Match Stripe payouts to DB invoices',",
  "  auto_approve: true",
  "});",
];

export function AgentTerminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  const [status, setStatus] = useState<"typing" | "running" | "done">("typing");

  useEffect(() => {
    if (status !== "typing") {
      if (status === "done") {
        const resetTimer = setTimeout(() => {
          setLines([]);
          setCurrentLineIdx(0);
          setCurrentCharIdx(0);
          setStatus("typing");
        }, 6000);
        return () => clearTimeout(resetTimer);
      }
      return;
    }

    if (currentLineIdx >= CODE_SEQUENCE.length) {
      setStatus("running");
      const runTimer = setTimeout(() => setStatus("done"), 1200);
      return () => clearTimeout(runTimer);
    }

    const currentTargetLine = CODE_SEQUENCE[currentLineIdx];

    if (currentCharIdx >= currentTargetLine.length) {
      const newLineTimer = setTimeout(() => {
        setLines((prev) => [...prev, currentTargetLine]);
        setCurrentLineIdx((prev) => prev + 1);
        setCurrentCharIdx(0);
      }, 100);
      return () => clearTimeout(newLineTimer);
    }

    const charTimer = setTimeout(
      () => {
        setCurrentCharIdx((prev) => prev + 1);
      },
      Math.random() * 30 + 10,
    );

    return () => clearTimeout(charTimer);
  }, [status, currentLineIdx, currentCharIdx]);

  const currentTypingLine = CODE_SEQUENCE[currentLineIdx]?.substring(0, currentCharIdx) || "";

  return (
    <section
      aria-labelledby="terminal-h"
      className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32"
    >
      <Reveal as="header" className="mb-12 max-w-2xl">
        <p className="section-rule">
          <span className="num">03</span> / Developer Experience
        </p>
        <h2 id="terminal-h" className="text-display mt-4 text-4xl sm:text-6xl">
          Code as infrastructure. <em className="not-italic text-accent">Agents as functions.</em>
        </h2>
        <p className="mt-4 max-w-xl text-ink-dim">
          Deploy fully autonomous, reasoning systems directly from your IDE. No low-code visual
          builders. Just pure code.
        </p>
      </Reveal>

      <Reveal delay={200}>
        <div className="card relative mx-auto max-w-4xl overflow-hidden rounded-2xl p-0 shadow-2xl">
          {/* Mac window header */}
          <div className="flex items-center gap-2 border-b border-line/60 bg-surface-2 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <div className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="ml-4 text-[11px] uppercase tracking-wider text-ink-mute font-medium">
              agent.ts — Nuron IDE
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr] p-4 text-sm sm:p-6 sm:text-[15px] leading-relaxed">
            <div className="select-none pr-6 text-right text-line font-mono">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            <div className="font-mono text-[#e5e5e5]">
              {lines.map((line, i) => {
                // Syntax highlighting hack for demo
                const highlighted = line
                  .replace(
                    /import|from|const|new|await|true/g,
                    (m) => `<span class="text-[#c678dd]">${m}</span>`,
                  )
                  .replace(/'.*?'/g, (m) => `<span class="text-[#98c379]">${m}</span>`)
                  .replace(
                    /Agent|stripe|postgres/g,
                    (m) => `<span class="text-[#e5c07b]">${m}</span>`,
                  )
                  .replace(
                    /name:|model:|tools:|task:|auto_approve:/g,
                    (m) => `<span class="text-[#d19a66]">${m}</span>`,
                  );

                return (
                  <div
                    key={i}
                    className="whitespace-pre"
                    dangerouslySetInnerHTML={{ __html: highlighted || " " }}
                  />
                );
              })}

              {status === "typing" && (
                <div className="whitespace-pre">
                  {currentTypingLine}
                  <span className="caret ml-0.5 inline-block h-4 w-2 bg-accent align-middle" />
                </div>
              )}

              {status === "running" && (
                <div className="mt-4 text-ink-mute animate-pulse">Running agent deployment...</div>
              )}

              {status === "done" && (
                <div className="mt-4 flex flex-col gap-2">
                  <div className="text-ink-mute">Running agent deployment...</div>
                  <div className="text-accent flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M10 3L4.5 8.5 2 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Success! Agent "Billing Reconciliation" is active.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
