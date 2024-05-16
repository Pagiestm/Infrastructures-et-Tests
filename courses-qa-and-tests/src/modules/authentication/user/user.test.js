import { describe, it, vi, expect, afterEach } from "vitest";
import { createUser } from './user.service';
import { createUserInRepository } from "./user.repository";

vi.mock("./user.repository", async (importOriginal) => ({
  ...(await importOriginal()),
  createUserInRepository: vi.fn((data) => {
    return {
      id: 4,
      name: data.name,
      birthday: data.birthday,
    };
  }),
})); 

describe("User Service", () => {
  afterEach(() => vi.clearAllMocks());
  it("should create an user", async () => {
    const user = await createUser({
      name: "Théotime P",
      birthday: new Date(2002, 4, 5),
    });

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.id).toBeTypeOf("number");
    expect(user).toHaveProperty("name", "Théotime P");
    expect(user.birthday).toBeDefined();
    expect(user.birthday.getFullYear()).toBe(2002);
    expect(user.birthday.getMonth()).toBe(4);
    expect(createUserInRepository).toBeCalledTimes(1);
    expect(createUserInRepository).toBeCalledWith({
      name: "Théotime P",
      birthday: new Date(2002, 4, 5),
    });
  });

  it("should trigger a bad request error when user creation", async () => {
    try {
      await createUser({
        name: "Théotime P",
      });
      assert.fail("createUser should trigger an error.");
    } catch (e) {
      expect(e.name).toBe('HttpBadRequest');
      expect(e.statusCode).toBe(400);
    }
  });

  it("should trigger an error when user is too young", async () => {
    try {
      const user = await createUser({
        name: "Théotime P",
        birthday: new Date(2010, 12, 24) // 11 years old
      });
      assert.fail("createUser should trigger an error.");
    } catch (e) {
      expect(e.statusCode).toBe(403);
      expect(e.message).toBe("User is too young.");
    }
  });
});