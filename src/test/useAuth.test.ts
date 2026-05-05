import { describe, it, expect, vi } from "vitest";
import { useAuth } from "../hooks/useAuth";
import { renderHook } from "@testing-library/react";

vi.mock("../lib/firebase", () => ({
  auth: {},
}));

vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: vi
    .fn()
    .mockResolvedValue({ user: { email: "test@test.com" } }),
  signInWithPopup: vi
    .fn()
    .mockResolvedValue({ user: { email: "test@test.com" } }),
  GoogleAuthProvider: vi.fn(),
  signOut: vi.fn().mockResolvedValue(undefined),
  onAuthStateChanged: vi.fn().mockReturnValue(() => {}),
}));

describe("useAuth", () => {
  it("loginWithEmail funksiyası olmalıdır", () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.loginWithEmail).toBeDefined();
  });

  it("loginWithEmail çağırılanda Firebase funksiyası işləməlidir", async () => {
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    const { result } = renderHook(() => useAuth());

    await result.current.loginWithEmail("test@test.com", "123456");

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      {},
      "test@test.com",
      "123456",
    );
  });

  it("loginWithGoogle funksiyası olmalıdır", () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.loginWithGoogle).toBeDefined();
  });

  it("logout çağırılanda Firebase signOut işləməlidir", async () => {
    const { signOut } = await import("firebase/auth");
    const { result } = renderHook(() => useAuth());

    await result.current.logout();

    expect(signOut).toHaveBeenCalledWith({});
  });
});
