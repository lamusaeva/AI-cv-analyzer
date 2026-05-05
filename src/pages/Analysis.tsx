import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCVStore } from "../store/useCVStore";
import { analyzeCV } from "../services/anthropic";
import type { Suggestion } from "../types";
import { updateScan } from "../services/firestore";

export default function Analysis() {
  const [activeFocus, setActiveFocus] = useState(0);

  const navigate = useNavigate();

  const [aiResult, setAiResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const parsed = aiResult ? JSON.parse(aiResult) : null;

  const fileName = useCVStore((state) => state.fileName);
  const cvText = useCVStore((state) => state.cvText);
  const setAnalysisResult = useCVStore((state) => state.setAnalysisResult);
  const currentScanId = useCVStore((state) => state.currentScanId);

  useEffect(() => {
    if (!cvText) return;
    if (!currentScanId) return;

    const analyze = async () => {
      setLoading(true);
      const result = await analyzeCV(cvText);
      const parsedResult = JSON.parse(result);
      setAiResult(result);
      setAnalysisResult(parsedResult);
      await updateScan(currentScanId, parsedResult.score, parsedResult);
      setLoading(false);
    };

    analyze();
  }, [cvText]);

  const focusOptions = [
    { label: "ATS uyğunluğu", key: "ats" },
    { label: "Keyword gücü", key: "keywords" },
    { label: "Dizayn təsiri", key: "design" },
    { label: "Cover letter", key: "coverLetter" },
  ];

  if (loading)
    return (
      <div className="min-h-screen bg-lavender px-4 flex flex-col items-center justify-center gap-3">
        <div className="bg-white rounded-2xl p-8 border border-purple-light w-full text-center">
          <div className="bg-purple-pale rounded-xl w-14 h-14 flex items-center justify-center mx-auto mb-4">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#534AB7"
              strokeWidth="1.5"
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
            </svg>
          </div>
          <p className="text-purple-deep font-semibold text-sm">
            AI analiz edir...
          </p>
          <p className="text-gray-400 text-xs mt-1">
            CV-niz oxunur və qiymətləndirilir
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-lavender px-4 pt-6 pb-8">
      <h1 className="text-sm font-semibold text-purple-mid mb-4">AI Analizi</h1>
      <div className="bg-gradient-to-b from-purple-soft to-purple-deep rounded-2xl p-4 mb-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-1 text-purple-light text-xs mb-3"
        >
          ← Geri
        </button>
        <p className="text-white font-semibold text-base">{fileName}</p>
        <span className="inline-block bg-purple-pale text-purple-mid text-xs font-bold px-3 py-1 rounded-full mt-2">
          {focusOptions[activeFocus].label}:{" "}
          {parsed?.focusScores?.[focusOptions[activeFocus].key] ?? "..."}%
        </span>
      </div>
      <div className="bg-white rounded-2xl p-4 mb-4 border border-purple-light relative min-h-48">
        <div className="flex flex-col gap-2 pr-40">
          <div className="h-4 bg-purple-light rounded-full w-2/3" />
          <div className="h-2 bg-purple-pale rounded-full w-1/3" />
          <div className="h-2 bg-purple-pale rounded-full" />
          <div className="h-2 bg-purple-pale rounded-full w-3/4" />
          <div className="h-2 bg-purple-pale rounded-full w-1/2" />
          <div className="h-2 bg-purple-pale rounded-full" />
          <div className="h-2 bg-purple-pale rounded-full w-3/4" />
        </div>
        {parsed?.suggestions
          .filter(
            (hs: Suggestion) => hs.focus === focusOptions[activeFocus].key,
          )
          .slice(0, 3)
          .map((hs: Suggestion, index: number) => (
            <div
              key={index}
              className="absolute right-3 flex items-center gap-1"
              style={{ top: `${16 + index * 36}px` }}
            >
              <div
                className={`text-xs px-2 py-1 rounded-lg border whitespace-nowrap
        ${hs.level === "critical" ? "bg-red-50 border-red-300 text-red-600" : ""}
        ${hs.level === "warning" ? "bg-amber-50 border-amber-300 text-amber-600" : ""}
        ${hs.level === "ok" ? "bg-green-50 border-green-300 text-green-600" : ""}
      `}
              >
                {hs.title}
              </div>
              <div
                className={`w-3 h-3 rounded-full flex-shrink-0
        ${hs.level === "critical" ? "bg-red-400" : ""}
        ${hs.level === "warning" ? "bg-amber-400" : ""}
        ${hs.level === "ok" ? "bg-green-400" : ""}
      `}
              />
            </div>
          ))}
      </div>
      <div className="bg-white rounded-2xl p-4 mb-4 border border-purple-light">
        <p className="text-xs font-semibold text-purple-mid mb-3">Fokus seç</p>
        <div className="flex flex-wrap gap-2">
          {focusOptions.map((opt, index) => (
            <button
              key={opt.label}
              onClick={() => setActiveFocus(index)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors
              ${
                activeFocus === index
                  ? "bg-purple-soft text-white border-purple-soft"
                  : "bg-purple-pale text-purple-mid border-purple-light"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={() => navigate("/result")}
        className="w-full bg-purple-soft text-white font-semibold py-3 rounded-2xl"
      >
        Optimallaşdırmaya keç
      </button>
    </div>
  );
}
