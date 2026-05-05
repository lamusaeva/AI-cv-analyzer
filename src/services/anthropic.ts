const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

export const analyzeCV = async (cvText: string): Promise<string> => {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: `Sən CV analiz edən ekspertsən. Bu CV-ni oxu və YALNIZ JSON formatında cavab ver, başqa heç nə yazma:
            {
                "score": 0-100 arası ümumi bal,
                "focusScores": {
                    "ats": 0-100,
                    "keywords": 0-100,
                    "design": 0-100,
                    "coverLetter": 0-100
                },
                "suggestions": [
                    {
                    "level": "critical" | "warning" | "ok",
                    "title": "qısa başlıq",
                    "message": "izah",
                    "focus": "ats" | "keywords" | "design" | "coverLetter"
                    }
                ]
            }

            CV mətni:
            ${cvText}`,
        },
      ],
    }),
  });

  const data = await response.json();
  const text = data.content[0].text;
  const cleaned = text
    .replace(/```json\n?/g, "")
    .replace(/```/g, "")
    .trim();
  return cleaned;
};

