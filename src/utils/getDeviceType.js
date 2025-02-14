import UAParser from "ua-parser-js";

export function getDeviceType() {
  if (typeof window === "undefined") return "Unknown";

  const parser = new UAParser();
  const result = parser.getResult();

  return {
    device: result.device.type || "Desktop",
    os: result.os.name,
    browser: result.browser.name,
  };
}
