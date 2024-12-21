import { Router } from 'express'
import steamConstroller from '../controllers/steamController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = new Router()

router.get('/auth/steam', steamConstroller.steamAuth)
router.get('/auth/steam/authenticate', steamConstroller.steamAuth2)
router.get('/auth/steam/check', authMiddleware, steamConstroller.checkSteam)




export default router;

