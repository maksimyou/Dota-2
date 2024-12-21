import ApiError from '../error/ApiError.js'
import Models from '../models/models.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()


const generateJwt = (id, username, email) => {
    return jwt.sign(
        { id, email, username },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}
class userController {

    async registration(req, res, next) {
        try {
            const { username, password, email } = req.body
            console.log(username, password, email)
            if (!email || !password || !username) {
                throw ApiError.badRequest('Некоректный email или  password')
            }

            const candidate1 = await Models.User.findOne({ where: { email } })
            if (candidate1) {
                throw ApiError.badRequest('Пользователь с таким email уже существует')
            }
            //const candidate2 = await Models.User.findOne({ where: { username } })
            //if (candidate2) {
            //    throw ApiError.badRequest('Пользователь с таким login`ом уже существует')
            //}
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await Models.User.create({
                email, password: hashPassword, username, avatarURL: JSON.stringify({
                    small: '',
                    medium: '',
                    large: ''
                })
            })
            //console.log(user)
            const token = generateJwt(user.id, user.username, user.email)
            return res.json({ token })
        } catch (error) {
            next(error)
        }
    }


    async login(req, res, next) {
        try {
            const { password, email } = req.body
            const user = await Models.User.findOne({ where: { email } })
            if (!user) {
                throw ApiError.internal("Пользователь с таким email не найден")
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                throw ApiError.internal("Указан неверный пароль")
            }
            const token = generateJwt(user.id, user.username, user.email)
            return res.json({ token })
        } catch (error) {
            next(error)
        }


    }


    async check(req, res, next) {
        try {
            console.log(req)
            const token = generateJwt(req.user.id, req.user.username, req.user.email)
            return res.json({ access: true })
        } catch (error) {
            next(ApiError.unauthorized('Неверный email или пароль'))
        }
    }


    async getDataUser(req, res, next) {
        try {
            let { id } = req.user
            console.log(req)
            const user = await Models.User.findOne({ where: { id } })
            return res.json({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                level: user.level,
                playstyle: user.playstyle,
                about_me: user.about_me,
                avatarURL: JSON.parse(user.avatarURL),
            })
        } catch (error) {
            next(ApiError.unauthorized('Ошибка получения данных пользователя'))
        }
    }




    async getUsers(req, res, next) {
        try {
            let { id } = req.user
            console.log(req)
            const users = await Models.User.findAll()
            return res.json(users)
        } catch (error) {
            next(ApiError.unauthorized('Ошибка получения данных пользователей'))
        }
    }




    async addFriend(req, res, next) {
        try {
            const { idUser } = req.body
            let { id } = req.user
            let str = (id).toString()

            console.log(idUser)
            const friend = await Models.FriendsList.findOne({
                where: {
                    userId: str
                }
            })
            console.log(friend)
            if (friend) {
                let arr = JSON.parse(friend.friendsList)
                await friend.update({ ...friend, friendsList: JSON.stringify([...arr, idUser]) })
            } else {
                await Models.FriendsList.create({ userId: str, friendsList: JSON.stringify([idUser]) })
            }
            return res.json(`Пользователь был добавлен в друзья`)
        } catch (error) {
            next(ApiError.internal('Ошибка добавление пользователя в друзья'))
        }
    }




    async getFriends(req, res, next) {
        try {
            let { id } = req.user
            let str = (id).toString()

            const friend = await Models.FriendsList.findOne({
                where: {
                    userId: str
                }
            })
            let arr = JSON.parse(friend.friendsList)
            let friends = [];
            for (const iter of arr) {
                let str2 = (iter).toString()
                let user = await Models.User.findAll({
                    where: {
                        id: str2
                    }
                })
                friends.push(...user)
            }
            return res.json(friends)
        } catch (error) {
            next(ApiError.unauthorized('Ошибка получения списка друзей'))
        }
    }

    //async getFirstName(req, res, next) {
    //    console.log(req)
    //    const login = req.user.email;
    //    const user = await Models.User.findOne({ where: { email } })
    //    if (user) {
    //        return res.json({ firstName: user.firstName })
    //    } else {
    //        return next(ApiError.internal("Не прошел проверку"))
    //    }
    //}



    //async delete(req, res) {
    //    const { id } = req.params
    //    await Models.User.destroy({
    //        where: { id }
    //    });
    //    return res.json(`Пользователь c id ${id} удален`)
    //}


    //async exit(req, res, next) {
    //    try {
    //        const { token } = req.body
    //        console.log(token)
    //        const decodedToken = jwt.verify(token, process.env.SECRET_KEY,);
    //        console.log(45654654)
    //        decodedToken.isActive = false;
    //        console.log(798732164)
    //        const newToken = jwt.sign(decodedToken, process.env.SECRET_KEY,);
    //    } catch (error) {
    //        next(ApiError.unauthorized('Ошибка выхода из системы'))
    //    }
    //}


}
export default new userController()

//node-steam-openid



//## Получение ID пользователя Dota 2 через Steam API:

//**1. Использование метода `GetPlayerSummaries`:**

//- **Запрос:**
//    - [неправильный URL удален]
//    - **Параметры:**
//        - `steamids`: ID пользователя Steam (до 100 ID)
//        - `key`: Ваш ключ Steam Web API
//- **Ответ:**
//    - JSON-объект с информацией о пользователях,
//        - Включая
//            - Имя
//                - Аватар
//                    - ID Dota 2 (поле `players` > `steamID`)
//- **Пример:**

//```javascript
//const steamID64 = '76561197960265728'; // Replace with your Steam ID
//const apiKey = 'YOUR_STEAM_WEB_API_KEY'; // Replace with your API key

//const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v002/?key=${apiKey}&steamids=${steamID64}`;

//fetch(url)
//  .then((response) => response.json())
//  .then((data) => {
//    const dota2ID = data.players[0].steamID;
//    console.log(`Dota 2 ID: ${dota2ID}`);
//  })
//  .catch((error) => console.error('Error:', error));
//```

//**2. Использование метода `GetPlayerBans`:**

//- **Запрос:**
//    - [неправильный URL удален]
//    - **Параметры:**
//        - `steamids`: ID пользователя Steam (до 100 ID)
//        - `key`: Ваш ключ Steam Web API
//- **Ответ:**
//    - JSON-объект с информацией о блокировках,
//        - Включая
//            - ID Dota 2
//                - (поле `Players` > `SteamID`)
//- **Пример:**

//```javascript
//const steamID64 = '76561197960265728'; // Replace with your Steam ID
//const apiKey = 'YOUR_STEAM_WEB_API_KEY'; // Replace with your API key

//const url = `https://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${apiKey}&steamids=${steamID64}`;

//fetch(url)
//  .then((response) => response.json())
//  .then((data) => {
//    if (data.players[0].hasOwnProperty('SteamID')) {
//      const dota2ID = data.players[0].SteamID;
//      console.log(`Dota 2 ID: ${dota2ID}`);
//    } else {
//      console.log('User has no Dota 2 ban history');
//    }
//  })
//  .catch((error) => console.error('Error:', error));
//```

//**3. Примечания:**

//- Вам потребуется `ключ Steam Web API`,
//    - Чтобы
//        - Доступ
//            - К
//                - API.
//- Убедитесь,
//    - Что
//        - Вы
//            - Заменяете
//                - `steamID64`
//                    - И
//                        - `apiKey`
//                            - Своими
//                                - Значениями.
//- ID Dota 2
//    - Не
//        - Обязательно
//            - Будет
//                - Доступен
//                    - В
//                        - Ответе
//                            - API
//                                - (зависит
//                                    - От
//                                        - Наличия
//                                            - Блокировок
//                                                - У
//                                                    - Пользователя).

//**4. Дополнительные методы:**

//- Steam API
//    - Предоставляет
//        - Другие
//            - Методы
//                - Для
//                    - Получения
//                        - Информации
//                            - О
//                                - Пользователях
//                                    - Dota 2.
//- Изучите
//    - Документацию
//        - Steam API
//            - ([неправильный URL удален])
//                - Для
//                    - Получения
//                        - Дополнительной
//                            - Информации.
