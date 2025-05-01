import dbConfig from "../config/db.config.js";
import Sequelize from "sequelize";
import Swap from "./swap.model.js";
import User from "./user.model.js";
 
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    port: dbConfig.PORT,
});
 
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.swap = Swap(sequelize, Sequelize);
db.user = User(sequelize, Sequelize);
 
db.user.hasMany(db.swap, { foreignKey: 'userId' });
db.swap.belongsTo(db.user, { foreignKey: 'userId' });

export default db;
