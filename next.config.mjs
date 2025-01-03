/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    reactStrictMode: false,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(ttf|woff|woff2|eot|otf)$/, // フォントファイルの拡張子
            type: 'asset/resource', // Webpack 5 のビルトイン機能を使用
            generator: {
                filename: 'static/fonts/[hash][ext]', // 出力先
            },
        });

        return config;
    },
};

export default nextConfig;
