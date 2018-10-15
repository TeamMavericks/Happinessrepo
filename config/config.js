const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: "mongodb://sdm.team13:devteam13@ds051833.mlab.com:51833/howisit"
};

export default config;
