import "dotenv/config"

export default {
  db: {
    client: process.env.DB_CLIENT,
    connection: {
      host: "db",
      user: "postgres",
      password: "postgres",
      database: "quizz",
    },
  },
  security: {
    session: {
      secret: process.env.SECURITY_SECRET,
      expiresIn: "2 days",
    },
  },
}
