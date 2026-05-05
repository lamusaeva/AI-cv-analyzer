import { useNavigate } from "react-router-dom";
import { useCVStore } from "../store/useCVStore";

export default function Result() {
  const bars = [
    { label: "ATS uyğunluğu", key: "ats", color: "bg-purple-soft" },
    { label: "Keyword gücü", key: "keywords", color: "bg-teal-400" },
    { label: "Dizayn təsiri", key: "design", color: "bg-purple-soft" },
    { label: "Cover letter", key: "coverLetter", color: "bg-red-400" },
  ];

  const analysisResult = useCVStore((state) => state.analysisResult);
  const setAnalysisResult = useCVStore((state) => state.setAnalysisResult);
  const file = useCVStore((state) => state.file);

  const navigate = useNavigate();

  const handleAccept = (index: number) => {
    if (!analysisResult) return;
    const updated = analysisResult.suggestions.map((s, i) =>
      i === index ? { ...s, accepted: true } : s,
    );
    setAnalysisResult({ ...analysisResult, suggestions: updated });
  };

  const handlePreview = () => {
    if (!file) return;

    window.open(URL.createObjectURL(file), "_blank");
  };

  const handleDownload = () => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
  };

  return (
    <div className="min-h-screen bg-lavender px-4 pt-6 pb-8">
      <h1 className="text-sm font-semibold text-purple-mid mb-4">Nəticə</h1>
      <div className="bg-white rounded-2xl p-4 mb-4 border border-purple-light">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-1 text-purple-light text-xs mb-3"
        >
          ← Geri
        </button>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full border-4 border-purple-soft bg-purple-pale flex flex-col items-center justify-center flex-shrink-0">
            <p className="text-purple-deep font-bold text-lg leading-none">
              {analysisResult?.score}
            </p>
            <p className="text-gray-400 text-xs">/100</p>
          </div>
          <div>
            <p className="text-purple-deep font-semibold text-sm">
              Orta nəticə
            </p>
            <p className="text-gray-400 text-xs mt-0.5">2 kritik problem var</p>
          </div>
        </div>
        {bars.map((bar) => (
          <div key={bar.label} className="mb-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500">{bar.label}</span>
              <span className="text-purple-mid font-semibold">
                {
                  analysisResult?.focusScores?.[
                    bar.key as keyof typeof analysisResult.focusScores
                  ]
                }
                %
              </span>
            </div>
            <div className="h-1.5 bg-purple-pale rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${bar.color}`}
                style={{
                  width: `${analysisResult?.focusScores?.[bar.key as keyof typeof analysisResult.focusScores]}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl p-4 mb-4 border border-purple-light">
        <div className="flex items-center gap-2 mb-3">
          <p className="text-sm font-semibold text-purple-deep">
            AI düzəliş rejimi
          </p>
          <span className="bg-purple-pale text-purple-mid text-xs font-bold px-2 py-0.5 rounded-md">
            AI EDIT
          </span>
        </div>

        {analysisResult?.suggestions.map((s, index) => (
          <div
            key={index}
            className={`rounded-xl p-3 mb-3 border transition-opacity
            ${s.accepted ? "opacity-40 pointer-events-none" : ""}
            ${s.level === "critical" ? "bg-red-50 border-red-300" : ""}
            ${s.level === "warning" ? "bg-amber-50 border-amber-300" : ""}
            ${s.level === "ok" ? "bg-green-50 border-green-300" : ""}
          `}
          >
            <p
              className={`text-xs font-semibold mb-1
            ${s.level === "critical" ? "text-red-600" : ""}
            ${s.level === "warning" ? "text-amber-600" : ""}
            ${s.level === "ok" ? "text-green-600" : ""}
          `}
            >
              {s.title}
            </p>
            <p className="text-xs text-gray-500 mb-2">{s.message}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleAccept(index)}
                className="bg-purple-soft text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
              >
                Qəbul et
              </button>
              {/* <button className="bg-purple-pale text-purple-mid text-xs px-3 py-1.5 rounded-lg border border-purple-light">
                Düzəlt
              </button> */}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button
          onClick={handlePreview}
          className="flex-1 border border-purple-soft text-purple-mid font-semibold py-3 rounded-2xl text-sm"
        >
          CV önizlə
        </button>
        <button
          onClick={handleDownload}
          className="flex-1 bg-purple-soft text-white font-semibold py-3 rounded-2xl text-sm"
        >
          PDF yüklə
        </button>
      </div>
    </div>
  );
}
