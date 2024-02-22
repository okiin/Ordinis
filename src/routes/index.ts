import { Router } from "express"
import { usuarioRouter } from "./usuario.routes"
import { sessaoRouter } from "./sessao.routes"
import { ensureAuthLogin } from "../middlewares/ensureAuthLogin"
import { patrimonioRoutes } from "./patrimonio.routes"
import { localizacaoRoutes } from "./localizacao.routes"
import { categoriaRoutes } from "./categoria.routes"
import { manutencaoRoutes } from "./manutencao.routes"
import { prestadorRoutes } from "./prestador.routes"

export const router = Router()

router.use('/login', sessaoRouter)

router.use(ensureAuthLogin)
router.use('/usuario', usuarioRouter)
router.use('/patrimonio', patrimonioRoutes)
router.use('/categoria', categoriaRoutes)
router.use('/localizacao', localizacaoRoutes)
router.use('/manutencao', manutencaoRoutes)
router.use('/prestador', prestadorRoutes)