import {} from "dotenv/config";
const sequelize = require("../modelingIndex");
describe("Driver Enterprise Model Tests", () => {
  it("Should be Defined", () => {
    expect(sequelize.models.empre_drive).toBeDefined();
  });
});
