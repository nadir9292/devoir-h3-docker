import QuestionModel from "../model/questionModel.js"

const questionRoute = ({ app }) => {
  //GET request
  app.get("/questions", async (req, res) => {
    const questions = await QuestionModel.query()
    res.send(questions)
  })

  //Random Classic
  app.get("/classic", async (req, res) => {
    const questionIds = await QuestionModel.query()
      .limit(5)
      .orderByRaw("RANDOM ()")

    res.send(questionIds)
  })

  //POST request
  app.post("/insertQuestion", async (req, res) => {
    const {
      body: {
        interrogation,
        first_answer,
        second_answer,
        third_answer,
        fourth_answer,
        good_answer,
        points,
      },
    } = req

    try {
      await QuestionModel.query().insertAndFetch({
        interrogation,
        first_answer,
        second_answer,
        third_answer,
        fourth_answer,
        good_answer,
        points,
      })
      const questions = (await QuestionModel.query()).at(-1)
      res.send(questions)
    } catch (err) {
      return res.status(500).send({ error: "Internal server error" })
    }
  })
}

export default questionRoute
