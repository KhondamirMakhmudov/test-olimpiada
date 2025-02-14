export const getDeviceInfo = async () => {
  if (typeof window !== "undefined") {
    const UAParser = (await import("ua-parser-js")).default;
    const parser = new UAParser();
    const result = parser.getResult();

    return {
      browser: result.browser.name,
      os: result.os.name,
      device: result.device.model || "Desktop",
    };
  }
  return null;
};
