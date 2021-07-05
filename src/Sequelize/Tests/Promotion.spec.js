import {} from "dotenv/config";
const sequelize = require("../modelingIndex");
describe("Promotion Model Tests", () => {
  it("Should be Defined", () => {
    expect(sequelize.models.promocion).toBeDefined();
  });
});
