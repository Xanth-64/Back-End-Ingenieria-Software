import {} from "dotenv/config";
const sequelize = require("../modelingIndex");
describe("Paypal Account Model Tests", () => {
  it("Should be Defined", () => {
    expect(sequelize.models.cuenta_paypal).toBeDefined();
  });
});
