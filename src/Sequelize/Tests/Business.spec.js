import {} from "dotenv/config";
const sequelize = require("../modelingIndex");
describe("Business Model Tests", () => {
  it("Should be Defined", () => {
    expect(sequelize.models.emprendimiento).toBeDefined();
  });
});
