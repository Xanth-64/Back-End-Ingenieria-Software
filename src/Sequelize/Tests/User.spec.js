import {} from "dotenv/config";
const sequelize = require("../modelingIndex");
describe("User Model Tests", () => {
  it("Should be Defined", () => {
    expect(sequelize.models.usuario).toBeDefined();
  });
});
