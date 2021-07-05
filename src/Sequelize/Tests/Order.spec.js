import {} from "dotenv/config";
const sequelize = require("../modelingIndex");
describe("Order Model Tests", () => {
  it("Should be Defined", () => {
    expect(sequelize.models.pedido).toBeDefined();
  });
});
