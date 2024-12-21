import ApiError from '../error/ApiError.js'
import models from '../models/models.js'
import { config } from 'dotenv'
config()
import { removeFile } from '../utils/file.js'
import { getFilePath } from '../utils/file.js'
import { v4 as uuidv4 } from 'uuid';




class steamController {
    users = {}
    messages = {}



    //async UploadFile(req, res) {
    //    console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO', req);
    //    try {
    //        if (!req.files.file) return res.sendStatus(400)
    //        console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBB', req.files.file);
    //        const relativeFilePath = req.files.path
    //            .replace(/\\/g, '/')
    //            .split('server/files')[1]
    //        res.status(201).json(relativeFilePath)
    //    } catch (error) {
    //        next(ApiError.internal('Ошибка получения файла'))
    //    }
    //}

    async createRoomAndFirstMessage(req, res, next) {
        try {
            const { message, toUserId } = req.body
            const { id } = req.user
            let str = (id).toString()
            console.log(message);
            let roomId = uuidv4();
            let haveIdRoom = false;
            //const arrayUsers = [toIdUser, id]
            console.log(roomId, id);
            let room = await models.RoomChat.findOne({
                where: {
                    userId: str
                }
            })
            let str2 = (toUserId).toString()

            let room2 = await models.RoomChat.findOne({
                where: {
                    userId: str2
                }
            })
            //console.log(room2);

            if (!room) {
                let obj = {}
                obj[roomId] = [id, toUserId]
                await models.RoomChat.create({ userId: id, roomsId: JSON.stringify([roomId]), usersId: JSON.stringify(obj) })
            } else {
                let arr = JSON.parse(room.roomsId)
                let arrr = JSON.parse(room.usersId)
                console.log(arr, arrr)
                for (const iterator in arrr) {
                    if (arrr[iterator].includes(id) && arrr[iterator].includes(toUserId)) {
                        haveIdRoom = true
                        roomId = iterator
                    }
                }
                console.log(haveIdRoom, 'sdf');
                if (!haveIdRoom) {
                    arrr[roomId] = [id, toUserId]
                    await room.update({ roomsId: JSON.stringify([...arr, roomId]), usersId: JSON.stringify(arrr) })
                }

            }
            console.log(haveIdRoom);
            if (!room2) {
                let obj = {}
                obj[roomId] = [toUserId, id]
                await models.RoomChat.create({ userId: toUserId, roomsId: JSON.stringify([roomId]), usersId: JSON.stringify(obj) })
            } else if (!haveIdRoom) {
                let arr2 = JSON.parse(room2.roomsId)
                let arrr2 = JSON.parse(room2.usersId)
                arrr2[roomId] = [toUserId, id]
                await room2.update({ roomsId: JSON.stringify([...arr2, roomId]), usersId: JSON.stringify(arrr2) })
            }

            await models.Message.create({ ...message, roomId: roomId })
            let idUsersArr = [id, toUserId]
            let arr = [];
            for (const iterator of idUsersArr) {
                let user = await models.User.findOne({
                    where: {
                        id: iterator
                    }
                })
                arr.push({ id: user.id, username: user.username, avatarURL: JSON.parse(user.avatarURL) })
            }
            if (haveIdRoom) {
                return res.json({ roomId: '', usersId: [] })
            } else {
                return res.json({ roomId, usersId: arr })
            }
        } catch (error) {
            next(ApiError.internal('Ошибка создания комнаты и добавления сообщения'))
        }
    }


    async getRoomsIdUser(req, res, next) {
        try {
            const { id } = req.user
            let str = (id).toString()
            console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH2', str);
            const rooms = await models.RoomChat.findOne({
                where: {
                    userId: str
                }
            })
            let users = {};
            if (rooms) {
                let usersId = JSON.parse(rooms.usersId)
                let roomsId = JSON.parse(rooms.roomsId)

                for (const iterator of roomsId) {
                    let arr = [];
                    for (let i = 0; i < usersId[iterator].length; i++) {
                        let user = await models.User.findOne({
                            where: {
                                id: usersId[iterator][i]
                            }
                        })
                        arr.push({ id: user.id, username: user.username, avatarURL: JSON.parse(user.avatarURL) })
                    }
                    users[iterator] = arr;
                }
                return res.json({ roomsId: JSON.parse(rooms.roomsId), usersId: users });
            } else {
                return res.json({ roomsId: [], usersId: {} });
            }
        } catch (error) {
            next(ApiError.internal('Ошибка получения комнат'))
        }
    }

    async UploadFile(req, res) {
        try {
            if (!req.file) return res.sendStatus(400)
            const relativeFilePath = req.file.path
                .replace(/\\/g, '/')
                .split('server/files')[1]
            res.status(201).json(relativeFilePath)
        } catch (error) {
            next(ApiError.internal('Ошибка получения файла'))
        }
    }


    async getFile(req, res) {
        try {
            const filePath = getFilePath(req.url)
            res.status(200).sendFile(filePath)
        } catch (error) {
            next(ApiError.internal('Ошибка получения файла'))
        }
    }


    onConnection(io, socket) {
        // извлекаем идентификатор комнаты и имя пользователя
        const { roomId, userName } = socket.handshake.query
        console.log('asdfasdf', socket)
        // записываем их в объект сокета
        socket.roomId = roomId
        socket.userName = userName

        // присоединяемся к комнате
        socket.join(roomId)

        // регистрируем обработчики для пользователей
        //this.userHandlers(io, socket)

        // регистрируем обработчики для сообщений
        this.messageHandlers(io, socket)
    }

    userHandlers(io, socket) {
        // извлекаем идентификатор комнаты и имя пользователя из объекта сокета
        const { roomId, userName } = socket

        // инициализируем хранилище пользователей
        if (!this.users[roomId]) {
            this.users[roomId] = []
        }

        // утилита для обновления списка пользователей
        const updateUserList = () => {
            // сообщение получают только пользователи, находящиеся в комнате
            io.to(roomId).emit('user_list:update', this.users[roomId])
        }

        // обрабатываем подключение нового пользователя
        socket.on('user:add', async (user) => {
            // сообщаем другим пользователям об этом
            socket.to(roomId).emit('log', `User ${user.userName} connected`)
            // записываем идентификатор сокета пользователя
            user.socketId = socket.id
            // записываем пользователя в хранилище
            if (this.users[roomId].find(e => e.roomId !== user.roomId) || this.users[roomId].length === 0) {
                this.users[roomId].push(user)
            }

            // обновляем список пользователей
            updateUserList()
        })

        // обрабатываем отключения пользователя
        socket.on('disconnect', () => {
            if (!this.users[roomId]) return

            // сообщаем об этом другим пользователям
            socket.to(roomId).emit('log', `User ${userName} disconnected`)

            // удаляем пользователя из хранилища
            this.users[roomId] = this.users[roomId].filter((u) => u.socketId !== socket.id)

            // обновляем список пользователей
            updateUserList()
        })
    }


    messageHandlers(io, socket) {
        // извлекаем идентификатор комнаты
        const { roomId } = socket
        console.log('1111111111111111111', roomId);
        // утилита для обновления списка сообщений
        const updateMessageList = () => {

            console.log('22222222222222222222222222222222', this.messages);
            console.log('3333333333333333333333333', this.messages[roomId]);

            io.to(roomId).emit('message_list:update', this.messages[roomId])
        }

        // обрабатываем получение сообщений
        socket.on('message:get', async (obj) => {
            try {
                // получаем сообщения по `id` комнаты
                const _messages = await models.Message.findAll({
                    where: {
                        roomId: obj.roomId
                    }
                })
                // инициализируем хранилище сообщений
                this.messages[roomId] = _messages
                // обновляем список сообщений
                updateMessageList()
            } catch (e) {
                ApiError.internal(e)
            }
        })

        // обрабатываем создание нового сообщения
        socket.on('message:add', async (message) => {
            // пользователи не должны ждать записи сообщения в БД

            await models.Message.create(message)
            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // это нужно для клиента
            message.createdAt = Date.now()

            // создаем сообщение оптимистически,
            // т.е. предполагая, что запись сообщения в БД будет успешной
            this.messages[roomId].push(message)

            // обновляем список сообщений
            updateMessageList()
        })

        // обрабатываем удаление сообщения
        socket.on('message:remove', (message) => {
            const { id, messageType, textOrPathToFile } = message

            // пользователи не должны ждать удаления сообщения из БД
            // и файла на сервере (если сообщение является файлом)
            models.Message.destroy({ where: { id } })
                .then(() => {
                    if (messageType !== 'text') {
                        removeFile(textOrPathToFile)
                    }
                })
                .catch(
                    e => ApiError.internal(e)
                )

            console.log(this.messages[roomId]);
            // удаляем сообщение оптимистически
            this.messages[roomId] = this.messages[roomId].filter((m) => m.messageId !== id)

            // обновляем список сообщений
            updateMessageList()
        })
    }

}

export default new steamController()


