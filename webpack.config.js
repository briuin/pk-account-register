const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "pkAccountRegister",
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  plugins: [
    new ModuleFederationPlugin({
        library: { type: "var", name: "pkAccountRegister" },

        // For remotes (please adjust)
        name: "pkAccountRegister",
        filename: "remoteEntry.js",
        exposes: {
            './App': './src/main.single-spa.ts',
            './RegisterModule': './src/app/components/register/register.module.ts'
        },

        // For hosts (please adjust)
        // remotes: {
        //     "mfe1": "http://localhost:3000/remoteEntry.js",

        // },

        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto', eager: true },
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto', eager: true },
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto', eager: true },
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto', eager: true },

          ...sharedMappings.getDescriptors()
        })

    }),
    sharedMappings.getPlugin()
  ],
};
