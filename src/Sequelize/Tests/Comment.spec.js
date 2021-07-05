import {} from "dotenv/config";
const sequelize = require("../modelingIndex");
describe("Comment Model Tests", () => {
  it("Should be Defined", () => {
    expect(sequelize.models.comentario).toBeDefined();
  });
});
