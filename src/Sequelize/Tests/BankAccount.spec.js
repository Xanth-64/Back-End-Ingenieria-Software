import {} from "dotenv/config";
const sequelize = require("../modelingIndex");
describe("Bank Account Model Tests", () => {
  it("Should be Defined", () => {
    expect(sequelize.models.cuenta_banca).toBeDefined();
  });
});
