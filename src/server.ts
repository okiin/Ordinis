import { app } from "./app"
import "express-async-errors"
import { env } from "./env"

app.listen(env.PORT, () => console.log(`Server running on http://localhost:${env.PORT}`))