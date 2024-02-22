import express from "express"
import cors from "cors"
import "express-async-errors"
import morgan from "morgan"
import { HandleError } from "./errors/HandleError"
import { router } from "./routes"

export const app = express()

app.use(cors())

app.use(express.json())

app.use(morgan('dev'))

app.use(router)

app.use(HandleError)