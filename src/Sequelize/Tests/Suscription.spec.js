import {} from "dotenv/config";
const sequelize = require("../modelingIndex");
describe("Suscription Model Tests", () => {
  it("Should be Defined", () => {
    expect(sequelize.models.suscripcion).toBeDefined();
  });
});
