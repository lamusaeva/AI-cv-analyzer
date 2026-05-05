import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCVStore } from "../store/useCVStore";
import { extractTextFromPDF } from "../services/pdf";
import { saveScan } from "../services/firestore";

export default function Upload() {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const navigate = useNavigate();

  const user = useCVStore((state) => state.user);

  const setFileName = useCVStore((state) => state.setFileName);
  const file = useCVStore((state) => state.file);
  const setCvText = useCVStore((state) => state.setCvText);
  const setCurrentScanId = useCVStore((state) => state.setCurrentScanId);

  const steps = [
    { label: "PDF oxunur" },
    { label: "Mətn çıxarılır" },
    { label: "AI analiz edir" },
    { label: "Nəticə hazırlanır" },
  ];

  const startProgress = async () => {
    if (!file) return;
    const text = await extractTextFromPDF(file);
    setCvText(text);
    setIsRunning(true);
    setFileName(file.name);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          setIsDone(true);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
  };

  useEffect(() => {
    if (!isDone) return;

    const save = async () => {
      const id = await saveScan({
        userId: user!.uid,
        fileName: file!.name,
        score: 0,
        date: new Date().toLocaleDateString("az-AZ"),
        cvText: useCVStore.getState().cvText,
      });
      setCurrentScanId(id);
      navigate("/analysis");
    };

    save();
  }, [isDone]);

  const currentStep =
    progress < 25 ? 0 : progress < 50 ? 1 : progress < 75 ? 2 : 3;

  return (
    <div className="min-h-screen bg-lavender px-4 pt-6 pb-8">
      <h1 className="text-sm font-semibold text-purple-mid mb-4">
        CV Yüklənir
      </h1>
      <div className="bg-white rounded-2xl p-8 border border-purple-light">
        <div className="bg-purple-pale rounded-xl p-3 w-14 h-14 flex items-center justify-center mx-auto mb-4">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#534AB7"
            strokeWidth="1.5"
          >
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <path d="M8 8h8M8 12h8M8 16h4" />
          </svg>
        </div>
        <p className="text-center text-sm font-semibold text-purple-deep mb-1">
          {isRunning ? steps[currentStep].label : "Başlamağa hazırdır"}
        </p>
        <p className="text-center text-xs text-gray-400 mb-4">
          {isRunning ? `${progress}% tamamlandı` : "Başlat düyməsinə bas"}
        </p>
        <div className="h-2 bg-purple-pale rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-purple-soft rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex flex-col gap-4">
          {steps.map((step, index) => (
            <div key={step.label} className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold
              ${index < currentStep ? "bg-green-500 text-white" : ""}
              ${index === currentStep && isRunning ? "bg-purple-soft text-white" : ""}
              ${index > currentStep ? "bg-purple-pale text-purple-mid" : ""}
            `}
              >
                {index < currentStep ? (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <p
                className={`text-xs ${index === currentStep && isRunning ? "text-purple-deep font-semibold" : "text-gray-400"}`}
              >
                {step.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={startProgress}
        disabled={isRunning}
        className="w-full bg-purple-soft text-white font-semibold py-3 rounded-2xl mt-4 disabled:opacity-50 transition-opacity"
      >
        {isRunning ? "Analiz edilir..." : "Başlat"}
      </button>
    </div>
  );
}
