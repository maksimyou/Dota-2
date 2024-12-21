import sequelize from '../db.js'
import { DataTypes } from 'sequelize'

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, unique: true },
    steamid: { type: DataTypes.BIGINT, },
    random_id: { type: DataTypes.BIGINT, },
    email: { type: DataTypes.STRING, },
    password: { type: DataTypes.STRING },
    firstName: { type: DataTypes.STRING, },
    lastName: { type: DataTypes.STRING, },
    role: { type: DataTypes.STRING, },
    level: { type: DataTypes.INTEGER, },
    playstyle: { type: DataTypes.STRING, },
    about_me: { type: DataTypes.STRING, },
    avatarURL: { type: DataTypes.JSON, }
})


const Teams = sequelize.define('teams', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
    captain_id: { type: DataTypes.INTEGER },

})

const TeamMembers = sequelize.define('team-members', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    team_id: { type: DataTypes.INTEGER, },
    user_id: { type: DataTypes.INTEGER },

})

const Games = sequelize.define('games', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    team1_id: { type: DataTypes.INTEGER, },
    team2_id: { type: DataTypes.INTEGER },
    score1: { type: DataTypes.INTEGER },
    score2: { type: DataTypes.INTEGER },
    date: { type: DataTypes.STRING },
})

const Message = sequelize.define('message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    messageType: { type: DataTypes.STRING, },
    textOrPathToFile: { type: DataTypes.STRING },
    roomId: { type: DataTypes.STRING },
    userId: { type: DataTypes.STRING },
    userName: { type: DataTypes.STRING },
})


const RoomChat = sequelize.define('room-chat', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    roomsId: { type: DataTypes.JSON },
    usersId: { type: DataTypes.JSON },
    //typeRoom: { type: DataTypes.STRING },
    userId: { type: DataTypes.STRING },
})

const FriendsList = sequelize.define('friends-list', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    friendsList: { type: DataTypes.JSON },
    userId: { type: DataTypes.STRING },
})



//await RoomChat.sync({ force: true });

//await User.sync({ force: true });
//await Teams.sync({ force: true });
//await TeamMembers.sync({ force: true });
//await Games.sync({ force: true });

//•	Команды: 
//o	id (уникальный идентификатор)
//o	name (название команды)
//o	captain_id (ID капитана)
//o	created_at (дата создания)
//o	updated_at (дата обновления)


//•	Team members: 
//o	team_id (ID команды)
//o	user_id (ID пользователя)
//o	created_at (дата создания)
//o	updated_at (дата обновления)


//•	Игры: 
//o	id (уникальный идентификатор)
//o	team1_id (ID команды 1)
//o	team2_id (ID команды 2)
//o	score1 (счет команды 1)
//o	score2 (счет команды 2)
//o	date (дата игры)
//o	created_at (дата создания)
//o	updated_at (дата обновления)


Связи:
//•	Один к одному: 
//o	Пользователь - адрес электронной почты
//•	Один ко многим: 
//o	Пользователь - команды
//o	Команда - члены команды
//o	Команда - игры
//•	Множество к множеству: 
//o	Пользователь - игры(через участие в команде)

//await User.sync({ alter: true });
//await User.truncate({ cascade: true });
//await sequelize.drop()

// Define relationships between tables (One-to-Many and Many-to-Many)
User.hasMany(Teams, { foreignKey: 'captain_id' }); // One user can be on many teams (through TeamMembers)
Teams.hasMany(TeamMembers, { foreignKey: 'team_id' }); // One team can have many members (through TeamMembers)
Teams.belongsTo(User, { foreignKey: 'id' }); // One user belongs to one team (through TeamMembers)
TeamMembers.belongsTo(Teams, { foreignKey: 'team_id' }); // One team member belongs to one team (through TeamMembers)

// Many-to-Many relationship between Users and Games (through participation in Teams)
User.belongsToMany(Games, { through: TeamMembers, foreignKey: 'user_id' });
Games.belongsToMany(User, { through: TeamMembers, foreignKey: 'team_id' });

export default { User, Teams, TeamMembers, Games, Message, RoomChat, FriendsList };











//1. Таблица "Чаты":

//Создайте таблицу "Чаты" для хранения основной информации о чате.
//chat_id: Уникальный идентификатор чата.
//users: Список участников чата (в виде JSON или массива ID пользователей).
//created_at: Дата и время создания чата.
//updated_at: Дата и время последнего обновления чата.
//2. Таблица "Сообщения":

//Создайте таблицу "Сообщения" для хранения информации о сообщениях в чате.
//message_id: Уникальный идентификатор сообщения.
//chat_id: ID чата, в котором было отправлено сообщение.
//sender_id: ID пользователя, отправившего сообщение.
//content: Текст сообщения.
//sent_at: Дата и время отправки сообщения.
//3. Таблица "Прочитанные сообщения":

//(Необязательно)
//Создайте таблицу "Прочитанные сообщения" для отслеживания того, кто из пользователей прочитал сообщения.
//user_id: ID пользователя.
//chat_id: ID чата.
//last_read_message_id: ID последнего прочитанного сообщения.
