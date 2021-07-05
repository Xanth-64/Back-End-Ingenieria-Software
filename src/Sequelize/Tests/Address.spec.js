import {} from "dotenv/config";
const sequelize = require("../modelingIndex");
describe("Address Model Tests", () => {
  it("Should be Defined", () => {
    expect(sequelize.models.direccion).toBeDefined();
  });
});
