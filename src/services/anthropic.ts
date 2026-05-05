// const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

// export const analyzeCV = async (cvText: string): Promise<string> => {
//   const response = await fetch("https://api.anthropic.com/v1/messages", {
//     method: "POST",
//     headers: {
//       "x-api-key": ANTHROPIC_API_KEY,
//       "anthropic-version": "2023-06-01",
//       "content-type": "application/json",
//       "anthropic-dangerous-direct-browser-access": "true",
//     },
//     body: JSON.stringify({
//       model: "claude-sonnet-4-6",
//       max_tokens: 2048,
//       messages: [
//         {
//           role: "user",
//           content: `Sən CV analiz edən ekspertsən. Bu CV-ni oxu və YALNIZ JSON formatında cavab ver, başqa heç nə yazma:
//             {
//                 "score": 0-100 arası ümumi bal,
//                 "focusScores": {
//                     "ats": 0-100,
//                     "keywords": 0-100,
//                     "design": 0-100,
//                     "coverLetter": 0-100
//                 },
//                 "suggestions": [
//                     {
//                     "level": "critical" | "warning" | "ok",
//                     "title": "qısa başlıq",
//                     "message": "izah",
//                     "focus": "ats" | "keywords" | "design" | "coverLetter"
//                     }
//                 ]
//             }

//             CV mətni:
//             ${cvText}`,
//         },
//       ],
//     }),
//   });

//   const data = await response.json();
//   const text = data.content[0].text;
//   const cleaned = text
//     .replace(/```json\n?/g, "")
//     .replace(/```/g, "")
//     .trim();
//   return cleaned;
// };

const MOCK_RESULT = {
  score: 74,
  focusScores: {
    ats: 70,
    keywords: 82,
    design: 60,
    coverLetter: 0,
  },
  suggestions: [
    {
      level: "critical",
      title: "Müraciət məktubu yoxdur",
      message:
        "CV-yə əlavə edilmiş cover letter tapılmadı. Beynəlxalq şirkətlərə müraciət edərkən bu vacibdir.",
      focus: "coverLetter",
    },
    {
      level: "critical",
      title: "Tarixlər üst-üstə düşür",
      message:
        "Softgroup Azerbaijan (06/2019–04/2023) ilə digər iş yerlərinin tarixləri paraleldir. ATS bu ziddiyyəti rədd ola bilər.",
      focus: "ats",
    },
    {
      level: "warning",
      title: "LinkedIn URL natamamdır",
      message:
        "linkedin.com/in/lamusaeva — tam URL deyil. https:// ilə tam link yazın.",
      focus: "ats",
    },
    {
      level: "warning",
      title: "Texniki bacarıqlar struktursuz sıralanıb",
      message:
        "ATS üçün hər bacarığın səviyyəsi qeyd edilsə daha güclü olardı.",
      focus: "keywords",
    },
    {
      level: "warning",
      title: "Kəmiyyət göstəriciləri çoxdur, kontekst azdır",
      message: "Bazis dəyərlər yoxdur. Bu işə götürəni şübhəyə sala bilər.",
      focus: "keywords",
    },
    {
      level: "warning",
      title: "Dizayn monotondur",
      message: "Vizual iyerarxiya zəifdir. Ağ boşluq oxunaqlığı artırar.",
      focus: "design",
    },
    {
      level: "ok",
      title: "Açar sözlər güclüdür",
      message:
        "React, Angular, Redux, REST API, Git, Jira — düzgün qeyd edilib.",
      focus: "keywords",
    },
    {
      level: "ok",
      title: "Beynəlxalq təcrübə vurğulanır",
      message:
        "Almaniya təcrübəsi beynəlxalq işəgötürənlər üçün artı dəyərdir.",
      focus: "keywords",
    },
    {
      level: "ok",
      title: "Təhsil və sertifikatlar aktual",
      message:
        "ITIL 2024 və PCEP 2026 sertifikatları CV-nin güncel olduğunu göstərir.",
      focus: "ats",
    },
  ],
};

export const analyzeCV = async (cvText: string): Promise<string> => {
  console.log(cvText);
  // API hazır olanda aşağıdakını açarsan:
  /*
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    ... köhnə kod ...
  })
  const data = await response.json()
  const text = data.content[0].text
  const cleaned = text.replace(/```json\n?/g, "").replace(/```/g, "").trim()
  return cleaned
  */

  return JSON.stringify(MOCK_RESULT);
};
