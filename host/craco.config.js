const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = {
  webpack: {
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: "host",
          remotes: {
            app1: "app1@http://localhost:3001/remoteEntry.js",
            app2: "app2@http://localhost:3002/remoteEntry.js",
          },
          shared: {
            ...deps,
            react: {
              eager: true,
              requiredVersion: deps.react,
            },
            "react-dom": {
              singleton: true,
              eager: true,
              requiredVersion: deps["react-dom"],
            },
          },
        }),
      ],
    },
  },
};
