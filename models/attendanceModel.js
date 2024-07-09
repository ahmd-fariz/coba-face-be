import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "../models/usersModel.js";

const { DataTypes } = Sequelize;

const attendance = db.define(
  "attendance",
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { freezeTableName: true }
);

User.hasMany(attendance, { foreignKey: "userId" });
attendance.belongsTo(User, { foreignKey: "userId" });

export default attendance;
