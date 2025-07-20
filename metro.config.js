// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push("pte");
config.resolver.assetExts.push("bin");
config.resolver.assetExts.push("ptl", "json", "txt");
config.resolver.sourceExts.push("cjs"); // Needed sometimes

// Ensure native libraries are included
config.resolver.platforms = ["native", "android", "ios", "web"];
config.resolver.unstable_enablePackageExports = true;
module.exports = config;
