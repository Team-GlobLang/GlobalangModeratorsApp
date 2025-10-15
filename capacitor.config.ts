import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.globalang.moderators",
  appName: "GLBMod",
  webDir: "dist",
  server: {
    cleartext: true,
  },
};

export default config;
