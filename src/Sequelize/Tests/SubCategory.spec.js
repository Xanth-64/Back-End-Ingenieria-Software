import {} from "dotenv/config";
const sequelize = require("../modelingIndex");
describe("Subcategory Model Tests", () => {
  it("Should be Defined", () => {
    expect(sequelize.models.subcategoria).toBeDefined();
  });
});
