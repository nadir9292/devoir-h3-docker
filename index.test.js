import request from "supertest"
import express from "express"
import allRoutes from "./src/routes/allRoutes.js"

describe("Test of the Express application", () => {
  let app

  beforeAll(() => {
    app = express()
    allRoutes({ app })
  })

  it("Creation of the express application instance", async () => {
    expect(app).toBeDefined()
  })

  it("Checking the listening port", async () => {
    const response = await request(app).get("/")
    expect(response.status).toBe(200)
    expect(response.text).toEqual("OK test")
  })
})
