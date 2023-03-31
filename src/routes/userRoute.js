import UserModel from "../model/userModel.js"
import hashPassword from "../method/hashPassword.js"
import config from "../../config.js"
import jsonwebtoken from "jsonwebtoken"
import auth from "../middlewares/auth.js"

const userRoute = ({ app }) => {
  //GET request
  app.get("/users", async (req, res) => {
    const users = await UserModel.query()
    res.send(users)
  })

  app.get("/users/:userId", auth, async (req, res) => {
    const {
      params: { userId },
      session: { userId: sessionUserId },
    } = req

    if (Number(userId) != sessionUserId) {
      return res.status(403).send({ error: "acces denied !" })
    }

    const user = await UserModel.query()
      .select("id", "pseudo", "total_points")
      .findById(userId)
    res.send(user)
  })

  //POST request
  //REGISTER
  app.post("/register", async ({ body: { pseudo, password } }, res) => {
    try {
      const user = await UserModel.findUserByPseudo(pseudo)

      if (user) {
        return res
          .status(401)
          .send({ error: "Your pseudo has been already used" })
      }

      const [passwordHash, passwordSalt] = hashPassword(password)

      const insertedUser = await UserModel.query().insertAndFetch({
        pseudo,
        passwordHash,
        passwordSalt,
      })

      res.send(insertedUser)
    } catch (err) {
      return res.status(401).send({ error: "Error : " + err })
    }
  })

  //LOGIN
  app.post("/login", async ({ body: { pseudo, password } }, res) => {
    try {
      const user = await UserModel.findUserByPseudo(pseudo)
      if (!user) {
        return res.status(401).send({ error: "User not found" })
      }

      if (!user.checkPassword(password)) {
        return res.status(401).send({ error: "Bad password !" })
      }

      const userId = user.id

      const jwt = jsonwebtoken.sign(
        { payload: { userId: user.id } },
        config.security.session.secret,
        { expiresIn: config.security.session.expiresIn }
      )

      return res.send({ userId, jwt })
    } catch (err) {
      return res.status(500).send({ error: "Internal server error" })
    }
  })

  //ADD POINTS
  app.post("/user/points/:userId", auth, async (req, res) => {
    try {
      const {
        params: { userId },
        session: { userId: sessionUserId },
        body: { score },
      } = req
      const user = await UserModel.findUserById(userId).select(
        "id",
        "pseudo",
        "total_points"
      )
      if (!user) {
        return res.status(401).send({ error: "User not found" })
      }
      if (Number(userId) != sessionUserId) {
        return res.status(403).send({ error: "acces denied !" })
      }
      user.total_points += Number(score)
      await user.$query().patch()
      res.send(user)
    } catch (err) {
      return res.status(500).send({ error: "Internal server error : " + err })
    }
  })
}

export default userRoute
