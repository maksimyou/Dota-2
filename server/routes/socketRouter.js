import { Router } from 'express'
import socketController from '../controllers/socketController.js'
import upload from '../utils/upload.js'
import authMiddleware from '../middleware/authMiddleware.js'
const router = new Router()



router.get('/files', socketController.getFile)
router.get('/get-rooms', authMiddleware, socketController.getRoomsIdUser)
router.post('/create-room', authMiddleware, socketController.createRoomAndFirstMessage)

router.post('/upload', upload.single('file'), socketController.UploadFile)


export default router;






