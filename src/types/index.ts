export type Suggestion = {
  id?: number;
  level: "critical" | "warning" | "ok";
  title: string;
  message: string;
  focus: "ats" | "keywords" | "design" | "coverLetter";
  accepted?: boolean;
};

export type AnalysisResult = {
  score: number;
  focusScores: {
    ats: number;
    keywords: number;
    design: number;
    coverLetter: number;
  };
  suggestions: Suggestion[];
};
