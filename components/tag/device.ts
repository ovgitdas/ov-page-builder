/**
 * Defines the possible device types: 'pc', 'mob', 'tab', 'wide', or 'ultra'.
 */
export type DeviceType = "pc" | "mob" | "tab" | "wide" | "ultra";

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
export function getDeviceType(width: number, height: number): DeviceType {
  // Ensure valid dimensions
  if (width <= 0 || height <= 0) {
    console.warn(
      "Invalid screen dimensions provided. Width and height must be positive."
    );
    return "pc"; // Default to PC for invalid input or handle as an error
  }

  // --- Width and Height Breakpoints ---
  const MOBILE_MAX_WIDTH = 767;
  const MOBILE_MAX_HEIGHT_PORTRAIT = 899; // Max height for typical portrait phones

  const TABLET_MIN_WIDTH = 768; // Minimum width for tablets
  const TABLET_MAX_WIDTH_PORTRAIT = 1023; // Max width for typical portrait tablets
  const TABLET_MAX_HEIGHT_PORTRAIT = 1367; // Max height for typical portrait tablets (e.g., iPad Pro 12.9" is 1366px high)

  const PC_STANDARD_MIN_WIDTH = 1024; // Minimum width for standard PC/laptop screens
  const WIDE_SCREEN_MIN_WIDTH = 1920; // Minimum width for wide screens (e.g., Full HD and above)
  const ULTRA_WIDE_SCREEN_MIN_WIDTH = 3440; // Minimum width for ultra screens (e.g., 3440x1440, 3840x1080)

  // --- Classification Logic: First by Orientation ---

  // Scenario 1: Landscape or Square-ish orientation (width >= height)
  if (width >= height) {
    // Check for ultra screens first based purely on width
    if (width >= ULTRA_WIDE_SCREEN_MIN_WIDTH) {
      return "ultra";
    }

    // Check for wide screens based purely on width
    if (width >= WIDE_SCREEN_MIN_WIDTH) {
      return "wide";
    }

    // If not ultra or wide, but still desktop-class width, it's a standard PC.
    // This includes standard laptops and desktop monitors, and also tablets in landscape
    // that have widths similar to smaller PCs (e.g., 1280x800).
    if (width >= PC_STANDARD_MIN_WIDTH) {
      return "pc";
    }

    // Fallback for smaller landscape devices (phones/small tablets in landscape)
    // If it's not desktop-class width, it's likely a mobile or tablet device in landscape.
    if (width <= MOBILE_MAX_WIDTH) {
      // Check if it's within mobile width range
      return "mob";
    }
    // If it's wider than mobile but not desktop-class, it's likely a tablet in landscape
    if (width >= TABLET_MIN_WIDTH && width < PC_STANDARD_MIN_WIDTH) {
      return "tab";
    }
    // Final fallback for landscape if none above matched (should be rare)
    return "pc"; // Default to PC for any unexpected large landscape width
  } else {
    // Scenario 2: Portrait orientation (width < height)
    // Mobile Device (MOB):
    // Narrow width AND relatively short height (for typical portrait phones).
    if (width <= MOBILE_MAX_WIDTH && height <= MOBILE_MAX_HEIGHT_PORTRAIT) {
      return "mob";
    }

    // Tablet Device (TAB):
    // Medium width and portrait orientation.
    if (
      width >= TABLET_MIN_WIDTH &&
      width <= TABLET_MAX_WIDTH_PORTRAIT &&
      height <= TABLET_MAX_HEIGHT_PORTRAIT
    ) {
      return "tab";
    }

    // Fallback for very tall, narrow screens that don't fit typical mobile/tablet.
    // This might catch unusual devices or very large tablets in portrait that
    // exceed the tablet max width (e.g., a future very large tablet).
    // Defaulting to 'tab' as it's still a portrait-first device.
    return "tab";
  }
}
