import {} from "dotenv/config";
const sequelize = require("../modelingIndex");
describe("Crypto Model Tests", () => {
  it("Should be Defined", () => {
    expect(sequelize.models.cuenta_crypto).toBeDefined();
  });
});
