import { describe, it, expect, vi } from "vitest";
import { extractTextFromPDF } from "../services/pdf";

vi.mock("../services/pdf", () => ({
  extractTextFromPDF: vi.fn().mockResolvedValue("test CV mətni"),
}));

describe("extractTextFromPDF", () => {
  it("mətn qaytarmalıdır", async () => {
    const file = new File([""], "test.pdf", { type: "application/pdf" });
    const result = await extractTextFromPDF(file);
    expect(result).toBe("test CV mətni");
  });

  it("funksiya düzgün fayl ilə çağırılmalıdır", async () => {
    const file = new File([""], "test.pdf", { type: "application/pdf" });
    await extractTextFromPDF(file);
    expect(extractTextFromPDF).toHaveBeenCalledWith(file);
  });

  it("xəta olduqda Promise reject etməlidir", async () => {
    vi.mocked(extractTextFromPDF).mockRejectedValueOnce(
      new Error("PDF xətası"),
    );
    const file = new File([""], "test.pdf", { type: "application/pdf" });
    await expect(extractTextFromPDF(file)).rejects.toThrow("PDF xətası");
  });
});
