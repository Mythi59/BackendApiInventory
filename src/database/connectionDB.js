import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("brm", "root", "pass1234", {
  dialect: "mysql",
  host: "127.0.0.1",
});
