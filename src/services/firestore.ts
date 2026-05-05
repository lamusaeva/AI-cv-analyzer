import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { AnalysisResult } from "../types";

export type ScanData = {
  id?: string;
  userId: string;
  fileName: string;
  score: number;
  date: string;
  cvText: string;
  analysisResult?: AnalysisResult | null;
};

export const saveScan = async (data: ScanData) => {
  const docRef = await addDoc(collection(db, "scans"), data);
  return docRef.id;
};

export const getScans = async (userId: string): Promise<ScanData[]> => {
  const q = query(
    collection(db, "scans"),
    where("userId", "==", userId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as ScanData),
  }));
};

export const updateScan = async (
  id: string,
  score: number,
  analysisResult: AnalysisResult,
): Promise<void> => {
  const scanRef = doc(db, "scans", id);
  await updateDoc(scanRef, { score, analysisResult });
};
