// next.config.ts
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import type { Configuration, WebpackPluginInstance } from 'webpack';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  webpack(
    config: Configuration & { plugins: WebpackPluginInstance[] },
    { isServer, webpack }
  ) {
    // Copie Workers, Widgets, Assets, ThirdParty → public/Cesium
    if (!isServer) {
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.join(
                __dirname,
                'node_modules/cesium/Build/Cesium/Workers'
              ),
              to: 'public/Cesium/Workers',
            },
            {
              from: path.join(
                __dirname,
                'node_modules/cesium/Build/Cesium/ThirdParty'
              ),
              to: 'public/Cesium/ThirdParty',
            },
            {
              from: path.join(
                __dirname,
                'node_modules/cesium/Build/Cesium/Assets'
              ),
              to: 'public/Cesium/Assets',
            },
            {
              from: path.join(
                __dirname,
                'node_modules/cesium/Build/Cesium/Widgets'
              ),
              to: 'public/Cesium/Widgets',
            },
          ],
        })
      );
    }

    // Chemin statique que Cesium utilisera dans le navigateur
    config.plugins.push(
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('/Cesium'),
      })
    );

    // Patch pour éviter un bug d’exports dans Cesium + webpack 5
    config.resolve!.exportsFields = [];

    return config;
  },
};

export default nextConfig;
