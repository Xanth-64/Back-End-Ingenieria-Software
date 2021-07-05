import {} from "dotenv/config";
const sequelize = require("../modelingIndex");
describe("Driver Model Tests", () => {
  it("Should be Defined", () => {
    expect(sequelize.models.driver).toBeDefined();
  });
});
