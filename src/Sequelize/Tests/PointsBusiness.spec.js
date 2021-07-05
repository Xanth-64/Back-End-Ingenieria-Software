import {} from "dotenv/config";
const sequelize = require("../modelingIndex");
describe("Business Points Model Tests", () => {
  it("Should be Defined", () => {
    expect(sequelize.models.puntaje_emprende).toBeDefined();
  });
});
