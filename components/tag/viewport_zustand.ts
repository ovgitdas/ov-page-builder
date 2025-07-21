import { create } from "zustand"
/**
 * Defines the possible device types: 'pc', 'mob', 'tab', 'wide', or 'ultra'.
 */
export type DeviceType = "pc" | "mob" | "tab" | "wide" | "ultra"

/**
 * Determines the device type (PC, Mobile, Tablet, Wide, or Ultrawide)
 * based on screen width, height, and calculated aspect ratio.
 * This provides a more nuanced classification than width alone.
 *
 * It incorporates a specific rule: if a tablet's resolution is equivalent to
 * a common PC resolution, it will be classified as 'pc', 'wide', or 'ultra' accordingly.
 *
 * @param width The width of the screen in pixels (CSS pixels/viewport width).
 * @param height The height of the screen in pixels (CSS pixels/viewport height).
 * @returns A string literal indicating the device type: 'pc', 'mob', 'tab', 'wide', or 'ultra'.
 */
function getDeviceType(width: number, height: number): DeviceType {
  // Ensure valid dimensions
  if (width <= 0 || height <= 0) {
    console.warn(
      "Invalid screen dimensions provided. Width and height must be positive."
    )
    return "pc" // Default to PC for invalid input or handle as an error
  }

  const aspectRatio = width / height

  // Define breakpoints for device classification.
  // These values are based on widely adopted responsive design breakpoints
  // and common aspect ratios.

  // --- Aspect Ratio Thresholds ---
  // Standard (16:9) ≈ 1.77
  // Standard (16:10) ≈ 1.6
  // Wide (21:9) ≈ 2.33
  // Ultrawide (32:9) ≈ 3.55

  // ASPECT_RATIO_WIDE_MIN is for aspect ratios like 21:9 (approx 2.33)
  const ASPECT_RATIO_WIDE_MIN = 1.9 // Catches aspect ratios wider than typical 16:9, e.g., 21:9 (2.33)
  // ASPECT_RATIO_SUPER_ULTRA_WIDE_MIN is for aspect ratios like 32:9 (approx 3.55)
  const ASPECT_RATIO_SUPER_ULTRA_WIDE_MIN = 3.0 // Catches truly super ultrawide aspect ratios

  // --- Width and Height Breakpoints ---
  const MOBILE_MAX_WIDTH = 767
  const MOBILE_MAX_HEIGHT = 899 // Prevents large phones in landscape from being 'tab' prematurely

  const TABLET_MIN_WIDTH = 768 // Minimum width for tablets (consistent definition)
  const TABLET_MAX_WIDTH = 1023 // Max width for typical portrait tablets
  const TABLET_MAX_HEIGHT_PORTRAIT = 1367 // Max height for typical portrait tablets (e.g., iPad Pro 12.9" is 1366px high)

  const PC_STANDARD_MIN_WIDTH = 1024 // Minimum width for any desktop-like screen

  // --- Classification Logic ---
  // The order of checks is important to ensure more specific categories are caught first.

  // 1. Mobile Device (MOB):
  // Narrow width AND relatively short height (for portrait phones).
  // Also catches most phones in landscape due to the MOBILE_MAX_HEIGHT.
  if (width <= MOBILE_MAX_WIDTH && height <= MOBILE_MAX_HEIGHT) {
    return "mob"
  }

  // 2. Tablet Device (TAB):
  // Medium width AND relatively standard aspect ratio for its size.
  // This handles tablets primarily in portrait. Tablets in landscape might fall into 'pc' or 'wide'
  // based on their width and aspect ratio, adhering to the rule.
  if (
    width >= TABLET_MIN_WIDTH &&
    width <= TABLET_MAX_WIDTH &&
    height <= TABLET_MAX_HEIGHT_PORTRAIT
  ) {
    return "tab"
  }

  // 3. Super Ultrawide Screen (ultra):
  // Primarily identified by a very high aspect ratio (e.g., 32:9).
  // This must come before 'wide' to catch the most extreme aspect ratios.
  if (aspectRatio >= ASPECT_RATIO_SUPER_ULTRA_WIDE_MIN) {
    return "ultra"
  }

  // 4. Wide Screen (WIDE):
  // Identified by a wider aspect ratio (e.g., 21:9) OR a large standard width (e.g., 1920px+ for 16:9).
  // This catches 21:9 monitors (via aspectRatio >= ASPECT_RATIO_WIDE_MIN)
  // and large 16:9 monitors/laptops (1920x1080, 2560x1440, 4K, 5K, 8K) via width >= 1920.
  // It must NOT be a super ultrawide (handled by the previous check).
  if (aspectRatio >= ASPECT_RATIO_WIDE_MIN || width >= 1920) {
    return "wide"
  }

  // 5. PC (Standard Desktop/Laptop):
  // This is the default for any screen that is not mobile, tablet, wide, or ultra,
  // but is still large enough to be considered a desktop experience.
  // This will catch resolutions like 1024x768, 1280x1024, 1280x800, 1366x768, 1536x864, 1600x900.
  // It must come after more specific large screen types.
  if (width >= PC_STANDARD_MIN_WIDTH) {
    return "pc"
  }

  // Fallback for any unclassified dimensions (should be rare with these ranges).
  // This might catch very unusual or very small desktop-like resolutions not covered.
  return "pc" // Default to PC
}

export const useViewPort = create<{
  category: string
  label: string
  width: number
  height: number
  deviceType: DeviceType
  setDevice(deviceLabel: string): void
}>((set) => ({
  category: "Laptop/Monitor",
  label: "Full HD (FHD)",
  width: 1920,
  height: 1080,
  deviceType: "pc",
  setDevice(deviceLabel: string) {
    const device = devices.find((d) => d.label === deviceLabel)
    if (!!device) {
      set({
        width: device.width,
        height: device.height,
        deviceType: getDeviceType(device.width, device.height),
        label: device.label,
      })
    }
  },
}))

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
]
