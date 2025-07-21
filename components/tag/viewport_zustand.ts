import { create } from "zustand"
/**
 * Defines the possible device types: 'pc', 'mob', 'tab', 'wide', or 'ultra'.
 */
export type DeviceType = "pc" | "mob" | "tab" | "wide" | "ultra"

/**
 * Determines the device type (PC, Mobile, Tablet, Wide, or Ultrawide)
 * based primarily on screen width, with some height considerations for mobile/tablet.
 * This version does NOT use aspect ratio for classification.
 *
 * It first categorizes based on orientation (landscape/square vs. portrait)
 * and then applies min/max width/height constraints.
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

  // --- Width and Height Breakpoints ---
  const MOBILE_MAX_WIDTH = 767
  const MOBILE_MAX_HEIGHT_PORTRAIT = 899 // Max height for typical portrait phones

  const TABLET_MIN_WIDTH = 768 // Minimum width for tablets
  const TABLET_MAX_WIDTH_PORTRAIT = 1023 // Max width for typical portrait tablets
  const TABLET_MAX_HEIGHT_PORTRAIT = 1367 // Max height for typical portrait tablets (e.g., iPad Pro 12.9" is 1366px high)

  const PC_STANDARD_MIN_WIDTH = 1024 // Minimum width for standard PC/laptop screens
  const WIDE_SCREEN_MIN_WIDTH = 1920 // Minimum width for wide screens (e.g., Full HD and above)
  const ULTRA_WIDE_SCREEN_MIN_WIDTH = 3440 // Minimum width for ultra screens (e.g., 3440x1440, 3840x1080)

  // --- Classification Logic: First by Orientation ---

  // Scenario 1: Landscape or Square-ish orientation (width >= height)
  if (width >= height) {
    // Check for ultra screens first based purely on width
    if (width >= ULTRA_WIDE_SCREEN_MIN_WIDTH) {
      return "ultra"
    }

    // Check for wide screens based purely on width
    if (width >= WIDE_SCREEN_MIN_WIDTH) {
      return "wide"
    }

    // If not ultra or wide, but still desktop-class width, it's a standard PC.
    // This includes standard laptops and desktop monitors, and also tablets in landscape
    // that have widths similar to smaller PCs (e.g., 1280x800).
    if (width >= PC_STANDARD_MIN_WIDTH) {
      return "pc"
    }

    // Fallback for smaller landscape devices (phones/small tablets in landscape)
    // If it's not desktop-class width, it's likely a mobile or tablet device in landscape.
    if (width <= MOBILE_MAX_WIDTH) {
      // Check if it's within mobile width range
      return "mob"
    }
    // If it's wider than mobile but not desktop-class, it's likely a tablet in landscape
    if (width >= TABLET_MIN_WIDTH && width < PC_STANDARD_MIN_WIDTH) {
      return "tab"
    }
    // Final fallback for landscape if none above matched (should be rare)
    return "pc" // Default to PC for any unexpected large landscape width
  } else {
    // Scenario 2: Portrait orientation (width < height)
    // Mobile Device (MOB):
    // Narrow width AND relatively short height (for typical portrait phones).
    if (width <= MOBILE_MAX_WIDTH && height <= MOBILE_MAX_HEIGHT_PORTRAIT) {
      return "mob"
    }

    // Tablet Device (TAB):
    // Medium width and portrait orientation.
    if (
      width >= TABLET_MIN_WIDTH &&
      width <= TABLET_MAX_WIDTH_PORTRAIT &&
      height <= TABLET_MAX_HEIGHT_PORTRAIT
    ) {
      return "tab"
    }

    // Fallback for very tall, narrow screens that don't fit typical mobile/tablet.
    // This might catch unusual devices or very large tablets in portrait that
    // exceed the tablet max width (e.g., a future very large tablet).
    // Defaulting to 'tab' as it's still a portrait-first device.
    return "tab"
  }
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
