import { defaultCrudCallbacks } from "../crud";

describe("Crud Callbacks Validations", () => {
  it("Should have a createOne function", () => {
    expect(defaultCrudCallbacks().createOne).toBeDefined();
  });
  it("Should have a createOne function", () => {
    expect(defaultCrudCallbacks().createOne).toBeDefined();
  });
  it("Should have a updateOne function", () => {
    expect(defaultCrudCallbacks().updateOne).toBeDefined();
  });
  it("Should have a deleteOne function", () => {
    expect(defaultCrudCallbacks().deleteOne).toBeDefined();
  });
  it("Should have a getOne function", () => {
    expect(defaultCrudCallbacks().getOne).toBeDefined();
  });
  it("Should have a getSome function", () => {
    expect(defaultCrudCallbacks().getSome).toBeDefined();
  });
  it("Should have a getMany function", () => {
    expect(defaultCrudCallbacks().getMany).toBeDefined();
  });
  it("Should have a updateSome function", () => {
    expect(defaultCrudCallbacks().updateSome).toBeDefined();
  });
});
