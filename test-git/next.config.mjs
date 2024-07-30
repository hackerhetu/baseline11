/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
            };
        }
        return config;
    },
    // Add this to increase the payload size limit if needed
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
};

export default nextConfig;