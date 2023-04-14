/** @type {import('next').NextConfig} */
const nextConfig = {
  //reactStrictMode: true,
  webpack:(config, options) =>{
    config.plugins.push(
      new options.webpack.container.ModuleFederationPlugin({
        name:"Remote",
        //remoteType: "var",
        remotes: {
          //Remote: `Remote@http://localhost:4000/moduleEntry.js`,
          Remote: `Remote@https://juanpabloab.github.io/module-fed.github.io/moduleEntry.js`,
        },
        exposes: {},
        shared: [
        {
          react: {
            eager: true,
            singleton: true,
            requiredVersion: false,
          }
        },
        {
          "react-dom": {
            eager: true,
            singleton: true,
            requiredVersion: false,
          }
        },
      ]
     }));
     config.module.rules.push({
      test: /_app.js/,
      loader: "@module-federation/nextjs-mf/lib/federation-loader.js",
    });
     return config;
  }
}

module.exports = nextConfig
