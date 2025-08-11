module.exports = {
  apps: [
    {
      name: "cms-api",
      script: "./server.js",
      watch: true,
      env: {
        PORT: 5005,
        NODE_ENV: "production"
      }
    }
  ]
};
