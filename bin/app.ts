import * as express from "express";
import { Logger } from "../lib/Logger";
import { upgrade } from "../lib/ExpresUpgrade";

const app = express()

app.disable('x-powered-by')

upgrade(app)

Logger.log('Create application')

export { app }
export default app