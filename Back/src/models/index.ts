const Sequelize = require("sequelize");

const config = require("../config/database");

const db: any = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const models = [
  "InfoCliente",
  "InfSaldoConta",
  "Moedas",
  "OrdensCliente"
];

models.forEach((module) => {
  const model = require(`./${module}`)(sequelize, Sequelize, config);
  db[model.name] = model;
});

Object.keys(db).forEach((key) => {
  if ("associate" in db[key]) {
    db[key].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
