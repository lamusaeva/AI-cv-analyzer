import { create } from "zustand";
import type { User } from "firebase/auth";
import type { AnalysisResult } from "../types";

type CVStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  fileName: string;
  setFileName: (name: string) => void;
  analysisResult: AnalysisResult | null;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  cvText: string;
  setCvText: (text: string) => void;
  currentScanId: string | null;
  setCurrentScanId: (id: string | null) => void;
};

export const useCVStore = create<CVStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  fileName: "",
  setFileName: (name) => set({ fileName: name }),
  analysisResult: null,
  setAnalysisResult: (result) => set({ analysisResult: result }),
  file: null,
  setFile: (file) => set({ file }),
  cvText: "",
  setCvText: (text) => set({ cvText: text }),
  currentScanId: "",
  setCurrentScanId: (id) => set({ currentScanId: id }),
}));
