import {} from "dotenv/config";
const sequelize = require("../modelingIndex");
describe("Catalog Model Tests", () => {
  it("Should be Defined", () => {
    expect(sequelize.models.categoria).toBeDefined();
  });
});
