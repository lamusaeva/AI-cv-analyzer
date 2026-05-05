import { useNavigate } from "react-router-dom";
import { useCVStore } from "../../store/useCVStore";
import { useRef } from "react";

export default function UploadCard() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const { setFileName, setFile } = useCVStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);
    setFileName(file.name);
    navigate("/upload");
  };

  return (
    <div className="bg-white border-2 border-dashed border-purple-light text-center rounded-2xl p-6 mb-4">
      <div className="bg-purple-pale rounded-xl p-2 w-10 h-10 flex items-center justify-center mx-auto mb-3">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#534AB7"
          strokeWidth="1.8"
        >
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 12h8M12 8v8" />
        </svg>
      </div>
      <p className="text-2xl font-semibold text-purple-deep">
        CV yukle - AI analizi
      </p>
      <p className="text-xs text-gray-400 mt-1">PDF format - Makx 5MB</p>
      {/* file input */}
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="w-full bg-purple-soft text-white text-xs font-semibold px-4 py-2 rounded-xl mt-3"
      >
        Fayl seç
      </button>
    </div>
  );
}
