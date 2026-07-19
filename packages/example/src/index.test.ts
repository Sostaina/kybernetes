import { describe, it, expect } from "vitest";
import { step } from "./index";

describe("step — controlador de feedback", () => {
  it("acerca el valor al objetivo por la ganancia", () => {
    expect(step(0, 10, 0.5)).toBe(5);
    expect(step(5, 10, 0.5)).toBe(7.5);
  });

  it("acota la ganancia a [0,1]", () => {
    expect(step(0, 10, 2)).toBe(10); // gain > 1 → clamped a 1
    expect(step(0, 10, -1)).toBe(0); // gain < 0 → clamped a 0
  });
});
