"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Script } from "@/data/types";

export function CopyButton({ script }: { script: Script }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const text = [
      script.title,
      "",
      "SITUATION:",
      script.situation,
      "",
      "THE SCRIPT:",
      ...script.fullScript.map(
        (step, i) =>
          `Step ${i + 1} — ${step.label}\n"${step.say}"${step.note ? `\nNote: ${step.note}` : ""}`
      ),
      "",
      "WHY IT WORKS:",
      script.whyItWorks,
      "",
      "COMMON MISTAKE:",
      script.commonMistake,
    ].join("\n");

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-emerald-600" />
          <span className="text-emerald-600">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          <span>Copy script</span>
        </>
      )}
    </button>
  );
}
