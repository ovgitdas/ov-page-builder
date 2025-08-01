import { create } from "zustand";
import { DeviceType, getDeviceType } from "./device";

export const useViewPort = create<{
  category: string;
  label: string;
  width: number;
  height: number;
  deviceType: DeviceType;
  setDevice(deviceLabel: string): void;
}>((set) => ({
  category: "Laptop/Monitor",
  label: "Full HD (FHD)",
  width: 1920,
  height: 1080,
  deviceType: "pc",
  setDevice(deviceLabel: string) {
    const device = devices.find((d) => d.label === deviceLabel);
    if (!!device) {
      set({
        width: device.width,
        height: device.height,
        deviceType: getDeviceType(device.width, device.height),
        label: device.label,
      });
    }
  },
}));

export const devices = [
  // --- Mobile Resolutions (primarily CSS pixels/viewport dimensions) ---
  {
    category: "Mobile",
    label: "iPhone SE (1st Gen)/Old Android",
    width: 320,
    height: 568,
  },
  {
    category: "Mobile",
    label: "iPhone 6/7/8/SE (2nd/3rd Gen)",
    width: 375,
    height: 667,
  },
  {
    category: "Mobile",
    label: "iPhone X/XS/11 Pro/12 Mini/13 Mini",
    width: 375,
    height: 812,
  },
  { category: "Mobile", label: "iPhone 6+/7+/8+", width: 414, height: 736 },
  {
    category: "Mobile",
    label: "iPhone XR/11/12/13/14",
    width: 390,
    height: 844,
  },
  {
    category: "Mobile",
    label: "iPhone 12 Pro Max/13 Pro Max/14 Plus/Pro",
    width: 428,
    height: 926,
  },
  {
    category: "Mobile",
    label: "Most Android (Small/Medium)",
    width: 360,
    height: 640,
  },
  {
    category: "Mobile",
    label: "Most Android (Common)",
    width: 360,
    height: 720,
  },
  {
    category: "Mobile",
    label: "Most Android (Larger)",
    width: 412,
    height: 846,
  },
  {
    category: "Mobile",
    label: "Google Pixel Series (e.g., Pixel 4 XL)",
    width: 411,
    height: 869,
  },

  // --- Tablet Resolutions (primarily CSS pixels/viewport dimensions) ---
  {
    category: "Tablet",
    label: "iPad Mini (all generations)",
    width: 768,
    height: 1024,
  },
  {
    category: "Tablet",
    label: "iPad (Standard, e.g., 9.7-inch, 10.2-inch)",
    width: 768,
    height: 1024,
  },
  {
    category: "Tablet",
    label: "iPad Air/Pro 10.5-inch",
    width: 834,
    height: 1194,
  },
  { category: "Tablet", label: "iPad Pro 11-inch", width: 834, height: 1194 },
  {
    category: "Tablet",
    label: "iPad Pro 12.9-inch",
    width: 1024,
    height: 1366,
  },
  {
    category: "Tablet",
    label: "Samsung Galaxy Tab A/S series (smaller)",
    width: 800,
    height: 1280,
  },
  {
    category: "Tablet",
    label: "Samsung Galaxy Tab S series (larger)",
    width: 1280,
    height: 800,
  }, // Often used in landscape
  {
    category: "Tablet",
    label: "Microsoft Surface Go",
    width: 768,
    height: 1024,
  },
  {
    category: "Tablet",
    label: "Microsoft Surface Pro (Effective)",
    width: 1368,
    height: 912,
  }, // Note: This will be classified as 'pc' by getDeviceType

  // --- Laptop & Monitor Resolutions (PC category in getDeviceType) ---
  { category: "Laptop", label: "HD (Budget Laptop)", width: 1366, height: 768 },
  {
    category: "Laptop/Monitor",
    label: "Full HD (FHD)",
    width: 1920,
    height: 1080,
  },
  {
    category: "Laptop/Monitor",
    label: "Mid-range/Budget HD+",
    width: 1536,
    height: 864,
  },
  { category: "Laptop/Monitor", label: "HD+", width: 1600, height: 900 },
  {
    category: "Laptop/Monitor",
    label: "Quad HD (QHD)",
    width: 2560,
    height: 1440,
  },
  {
    category: "Laptop/Monitor",
    label: "WQXGA (16:10)",
    width: 2560,
    height: 1600,
  },
  {
    category: "Laptop",
    label: "High-end Retina/Proprietary",
    width: 2880,
    height: 1800,
  },
  { category: "Laptop/Monitor", label: "4K UHD", width: 3840, height: 2160 },

  // --- Dedicated Monitor Resolutions (also fall under PC category in getDeviceType) ---
  {
    category: "Monitor",
    label: "SXGA (Older/Office Monitor)",
    width: 1280,
    height: 1024,
  }, // 5:4 aspect ratio
  {
    category: "Monitor",
    label: "WXGA (Older/Budget Monitor)",
    width: 1280,
    height: 720,
  }, // HD, but for monitors
  {
    category: "Monitor",
    label: "UW-FHD (Ultrawide Full HD)",
    width: 2560,
    height: 1080,
  }, // 21:9 aspect ratio
  {
    category: "Monitor",
    label: "UW-QHD (Ultrawide Quad HD)",
    width: 3440,
    height: 1440,
  }, // 21:9 aspect ratio
  { category: "Monitor", label: "Super Ultrawide", width: 3840, height: 1080 }, // 32:9 aspect ratio
  { category: "Monitor", label: "5K", width: 5120, height: 2880 },
  { category: "Monitor", label: "8K UHD", width: 7680, height: 4320 },
];
