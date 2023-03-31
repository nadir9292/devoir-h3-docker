import questionRoute from "./questionRoute.js"
import userRoute from "./userRoute.js"
import healthRoute from "./health.js"

const allRoutes = ({ app, db }) => {
  questionRoute({ app, db })
  userRoute({ app, db })
  healthRoute({ app, db })
}

export default allRoutes
