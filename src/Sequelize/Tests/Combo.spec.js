import {} from "dotenv/config";
const sequelize = require("../modelingIndex");
describe("Combo Model Tests", () => {
  it("Should be Defined", () => {
    expect(sequelize.models.combo).toBeDefined();
  });
});
