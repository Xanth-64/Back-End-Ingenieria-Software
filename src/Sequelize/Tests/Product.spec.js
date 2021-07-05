import {} from "dotenv/config";
const sequelize = require("../modelingIndex");
describe("Product Model Tests", () => {
  it("Should be Defined", () => {
    expect(sequelize.models.producto).toBeDefined();
  });
});
