import express from 'express'
import { config } from 'dotenv'
import sequelize from './db.js'
import models from './models/models.js'
import cors from 'cors'
import { Server } from 'socket.io'
//import fileUpload from 'express-fileupload'
import router from './routes/index.js'
import errorHandler from './middleware/ErrorHandlingMiddleware.js'
import socketController from './controllers/socketController.js'
import path, { join } from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import SteamAuth from "node-steam-openid";
import { createServer } from 'http'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config()
const PORT = process.env.PORT || 5000;
const app = express()
const server = createServer(app)
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.static(path.resolve(__dirname)))

//app.use(fileUpload())
app.use('/api', router)
//Обработка ошибок, последний Middleware
app.use(errorHandler)

app.get('/', (req, res) => {
    res.status(200).json({ maessage: 'WORKING!!!!' })
})



const steam = new SteamAuth({
    realm: "http://localhost:5000", // Site name displayed to users on logon
    returnUrl: "http://localhost:5000/api/steam/auth/steam/authenticate", // Your return route
    apiKey: process.env.STEAM_API_KEY // Steam API key
});



const io = new Server(server, {
    cors: process.env.ALLOWED_ORIGIN,
    serveClient: false
})


io.on('connection', (socket) => {
    socketController.onConnection(io, socket)
})


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync() //{ force: true }

        //удаление всех таблиц
        //await sequelize.drop()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
        server.listen(5030, () => {
            console.log('listening on *:5030');
        });

    } catch (error) {
        console.log(error)
    }
}

start()

export default steam