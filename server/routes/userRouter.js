import { Router } from 'express'
import userConstroller from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = new Router()

router.post('/registration', userConstroller.registration)
//router.post('/step-email', userConstroller.registrationStepEmail)
//router.post('/step-login', userConstroller.registrationStepLogin)
//router.post('/exit', userConstroller.exit)
router.post('/login', userConstroller.login)
router.get('/get-user', authMiddleware, userConstroller.getDataUser)
router.get('/get-users', authMiddleware, userConstroller.getUsers)
router.get('/get-friends', authMiddleware, userConstroller.getFriends)
router.post('/add-friend', authMiddleware, userConstroller.addFriend)
router.get('/auth', authMiddleware, userConstroller.check)
//router.get('/first-name', authMiddleware, userConstroller.getFirstName)
//router.get('/delete/:id', userConstroller.delete)


export default router;