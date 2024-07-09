import { Sequelize } from "sequelize";

const db = new Sequelize("coba-face", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
