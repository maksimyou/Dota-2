import { Router } from 'express'
//import bookRouter from './bookRouter.js'
//import bookingRouter from './bookingRouter.js'
//import categorieRouter from './categorieRouter.js'
//import commentRouter from './commentRouter.js'
//import deliveryRouter from './deliveryRouter.js'
//import historieRouter from './historieRouter.js'
import userRouter from './userRouter.js'
import steamRouter from './steamRouter.js'
import socketRouter from './socketRouter.js'

const router = new Router()

router.use('/user', userRouter)
router.use('/steam', steamRouter)
router.use('/socket', socketRouter)






export default router;