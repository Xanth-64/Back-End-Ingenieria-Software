import {} from "dotenv/config";
import router from "../auth";

describe("Authentication Routes", () => {
  it("Should have Login and Signup", () => {
    const routes = [
      { path: "/login", method: "post" },
      { path: "/signup", method: "post" },
    ];

    routes.forEach((route) => {
      const match = router.stack.find(
        (r) => r.route.path === route.path && r.route.methods[route.method]
      );
      expect(match).toBeTruthy();
    });
  });
});
