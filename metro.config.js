const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Escape function for RegExp
const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Normalize root path to support both Windows and POSIX separators
const normalizedRoot = __dirname.replace(/\\/g, '/');
const rootPat = escapeRegExp(normalizedRoot).replace(/\//g, '[\\\\/]');

// Create RegExp pattern to ignore root-level native folders and any native folders in node_modules from being watched/resolved
const nativeIgnorePattern = new RegExp(
  `^(android|ios)([\\\\/].*|$)|${rootPat}[\\\\/](android|ios)([\\\\/].*|$)|(^|[\\\\/])node_modules[\\\\/].*[\\\\/](android|ios)([\\\\/].*|$)`
);

// Add the native ignore pattern to the blockList array
if (!config.resolver) {
  config.resolver = {};
}
if (!config.resolver.blockList) {
  config.resolver.blockList = [];
} else if (!Array.isArray(config.resolver.blockList)) {
  config.resolver.blockList = [config.resolver.blockList];
}

config.resolver.blockList.push(nativeIgnorePattern);

module.exports = config;
