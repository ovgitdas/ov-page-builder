import { create } from "zustand";

export const useViewPort = create<{
  width: number;
  height: number;
  deviceType: "mob" | "tab" | "pc";
  setDeviceType(deviceType: "mob" | "tab" | "pc"): void;
}>((set, get) => ({
  width: 1366,
  height: 768,
  deviceType: "pc",
  setDeviceType(deviceType: "mob" | "tab" | "pc") {
    set({
      width: deviceType === "mob" ? 360 : deviceType === "tab" ? 768 : 1366,
      height: deviceType === "mob" ? 800 : deviceType === "tab" ? 1024 : 768,
      deviceType: deviceType,
    });
  },
}));
