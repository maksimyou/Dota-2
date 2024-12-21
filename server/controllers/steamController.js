import ApiError from '../error/ApiError.js'
import models from '../models/models.js'
import steam from '../index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()




const generateJwt = (id, steamid, random_id) => {
    return jwt.sign(
        { id, steamid, random_id },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}



class steamController {

    async steamAuth(req, res, next) {
        console.log('sssss')
        const redirectUrl = await steam.getRedirectUrl();
        console.log(redirectUrl)
        return res.json(redirectUrl);

    }

    async steamAuth2(req, res, next) {
        try {
            const user = await steam.authenticate(req);
            //...do something with the data

            let avatarObj = JSON.stringify(user.avatar)
            let user2 = await models.User.findOne({
                where: { steamid: user.steamid },
            });
            if (!user2) {
                user2 = await models.User.create({
                    steamid: user.steamid,
                    random_id: new Date().getTime(),
                    username: user.username,
                    avatarURL: avatarObj,
                    firstName: user.name
                })
            }

            const token = generateJwt(user2.id, user.steamid, user2.random_id)

            console.log(req, user)

            return res.redirect(`http://localhost:5173/?token=${token}`);

        } catch (error) {
            next(ApiError.internal(error))
        }

    }


    async checkSteam(req, res, next) {
        try {
            console.log(req)
            const token = generateJwt(req.user.steamid, req.user.random_id)
            console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGDDDDDFFFFFFFFFFFFFF')
            return res.json({ access: true })
        } catch (error) {
            next(ApiError.unauthorized('Неверный email или пароль'))
        }
    }

}

export default new steamController()




//_json: {
//    steamid: '76561198053477813',
//    communityvisibilitystate: 3,
//    profilestate: 1,
//    personaname: 'road to 100 mmr',
//    commentpermission: 1,
//    profileurl: 'https://steamcommunity.com/profiles/76561198053477813/',
//    avatar: 'https://avatars.steamstatic.com/7a63261240f23e36257fa6b298bea595913d1d21.jpg',
//    avatarmedium: 'https://avatars.steamstatic.com/7a63261240f23e36257fa6b298bea595913d1d21_medium.jpg',
//    avatarfull: 'https://avatars.steamstatic.com/7a63261240f23e36257fa6b298bea595913d1d21_full.jpg',
//    avatarhash: '7a63261240f23e36257fa6b298bea595913d1d21',
//    personastate: 0,
//    realname: 'Максим',
//    primaryclanid: '103582791429521408',
//    timecreated: 1322411941,
//    personastateflags: 0,
//    loccountrycode: 'RU'
//  },
//  steamid: '76561198053477813',
//  username: 'road to 100 mmr',
//  name: 'Максим',
//  profile: 'https://steamcommunity.com/profiles/76561198053477813/',
//  avatar: {
//    small: 'https://avatars.steamstatic.com/7a63261240f23e36257fa6b298bea595913d1d21.jpg',
//    medium: 'https://avatars.steamstatic.com/7a63261240f23e36257fa6b298bea595913d1d21_medium.jpg',
//    large: 'https://avatars.steamstatic.com/7a63261240f23e36257fa6b298bea595913d1d21_full.jpg'
//  }






//// Сгенерировать токен
//const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });





//// Создать объект куки
//const cookie = {
//    name: 'auth-token',
//    value: token,
//    httpOnly: true,
//    secure: true // (только если используется HTTPS)
//};

//// Добавить куки в ответ
//res.setHeader('Set-Cookie', cookie);

//// Отправить ответ
//res.json({ message: 'Successfully logged in' });





//## Сохранение данных пользователя после авторизации Steam Auth 2.0 в вашей БД

//**1. Сопоставление данных:**

//* **Steam ID:**  Сохраните `steamid` из полученных данных в таблице `User`. Это будет уникальный идентификатор пользователя в вашей системе.
//* **Имя:**  Объедините `personaname` и `realname` (если доступно) в поле `username` или `firstName` и `lastName` в вашей таблице.
//* **Изображение профиля:**  Сохраните `avatarfull` в поле `avatarURL` вашей таблицы.
//* **Роль:**  На основании данных профиля (например, уровень Steam, принадлежность к клану)  можно определить роль пользователя.
//* **Уровень:**  Сохраните `level` (если доступно) в соответствующее поле.
//* **Стиль игры:**  Можно использовать `playstyle` (если доступно) для определения предпочтений пользователя.
//* **О себе:**  Сохраните `commentpermission` (если доступно) для определения того, может ли пользователь делиться информацией о себе.

//**2. Генерация токена:**

//* **JSON Web Token (JWT):**  Используйте библиотеку JWT, такую как `jsonwebtoken` в Node.js, для генерации токена.
//* **Payload:**  Включите в payload токена `steamid` пользователя, а также любые другие необходимые данные (например, роль, уровень).
//* **Секретный ключ:**  Для обеспечения безопасности используйте надежный секретный ключ, который не хранится в коде.
//* **Срок действия:**  Определите срок действия токена (например, 1 час, 1 день).

//**3. Сохранение пользователя и токена:**

//* **Сохраните пользователя:**  Вставьте данные пользователя в таблицу `User`, если он еще не существует.
//* **Сохраните токен:**  Можно сохранить токен в базе данных, связанной с пользователем, или в HTTP-куки пользователя.

//**4. Авторизация с помощью токена:**

//* **Проверка токена:**  При каждом запросе пользователя сервер должен проверять наличие токена в заголовке запроса или в HTTP-куки.
//* **Декодирование токена:**  Используйте библиотеку JWT для декодирования токена и получения информации о пользователе.
//* **Аутентификация:**  Если токен действителен, пользователь авторизован.

//**Пример реализации с использованием Node.js и Sequelize:**

//```javascript
//const User = sequelize.define('user', {
//  // ... (описание полей)
//});

//// Авторизация пользователя
//app.post('/auth/steam', async (req, res) => {
//  const { steamid } = req.body;

//  // Получить данные пользователя из Steam
//  const steamUser = await getSteamUserData(steamid);

//  // Сохранить пользователя в БД
//  const user = await User.findOrCreate({
//    where: { steamid },
//    defaults: {
//      username: steamUser.personaname,
//      avatarURL: steamUser.avatarfull,
//      // ... (другие данные)
//    },
//  });

//  // Сгенерировать токен
//  const token = generateToken({ steamid: user.id });

//  // Сохранить токен (например, в БД или HTTP-куки)
//  res.json({ token });
//});

//// Проверка токена
//app.use(async (req, res, next) => {
//  const token = req.headers.authorization || req.cookies.token;

//  if (!token) {
//    return res.status(401).send('Unauthorized');
//  }

//  try {
//    const decodedToken = verifyToken(token);
//    const userId = decodedToken.steamid;

//    // Получить пользователя из БД
//    const user = await User.findByPk(userId);

//    if (!user) {
//      return res.status(401).send('Invalid token');
//    }

//    req.user = user;
//  } catch (error) {
//    return res.status(401).send('Invalid token');
//  }

//  next();
//});
//```

//**Ссылки:**

//* Steam Auth 2.0 [неправильный URL удален]
//* [JSON Web Token](https://jwt.io/)
//* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
//*


