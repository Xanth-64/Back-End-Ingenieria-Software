import {} from "dotenv/config";
const sequelize = require("../modelingIndex");
describe("Discount Model Tests", () => {
  it("Should be Defined", () => {
    expect(sequelize.models.descuento).toBeDefined();
  });
});
