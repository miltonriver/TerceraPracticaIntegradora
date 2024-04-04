import { Router } from "express";
import usersRouter from "./users.router.js";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";
import messagesRouter from "./messages.router.js";
import pruebasRouter from "./pruebas.router.js";
import sessionsRouter from "./sessions.router.js";


const router = Router()

router.use('/api/users', usersRouter)
router.use('/api/products', productsRouter)
router.use('/api/carts', cartsRouter)
router.use('/api/messages', messagesRouter)
router.use('/api/sessions', sessionsRouter)
router.use('/pruebas', pruebasRouter)

export default router