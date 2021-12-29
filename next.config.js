const withLess = require("next-with-less");

module.exports = withLess({
    // reactStrictMode: true,
    lessLoaderOptions: {},
    swcMinify: true,
    experimental: {
        // ssr and displayName are configured by default
        styledComponents: true,
    },
});
