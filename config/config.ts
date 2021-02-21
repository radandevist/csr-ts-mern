// const pkg = require("../package.json");

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  db: {
    mongoUri:
        process.env.MONGODB_URI ||
        process.env.MONGO_HOST ||
        `mongodb://${process.env.IP || "localhost"}:${process.env.MONGO_PORT || "27017"}/${process.env.DB_NAME || "mern-mono-ts"}`,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key",
    tokenLife: "2h",
    cookieName: "csr_ts_mern_token",
    cookieMaxAge: 24 * 60 * 60 * 1000, // 24h in milliseconds
  },
  siteAdmin: {
    name: "superadmin",
    email: "superadmin@gmail.com",
    password: process.env.ADMIN_PASS || "1234567",
  },
};

export default config;
