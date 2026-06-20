const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro"); // Capital W
 
/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
 
// Dhyaan dein: Yahan bhi 'withNativeWind' (Capital W) hona chahiye
module.exports = withNativeWind(config, { input: "./global.css" });
