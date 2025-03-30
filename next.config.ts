import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    webpack: (config) =>  {
        config.resolve = {
            ...config.resolve,
            fallback: {
                fs: false
            }
        }
        return config
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'nextjscourse.s3.us-east-1.amazonaws.com',
                port: '',
                pathname: '**',
                search: '',
            }
        ]
    }
};

export default nextConfig;
