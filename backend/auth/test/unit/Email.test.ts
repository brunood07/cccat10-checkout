import Email from "../../src/domain/entity/Email";

test("Deve criar um email válido", function () {
  const email = new Email("joao@gmail.com");
  expect(email.value).toBe("joao@gmail.com");
});

test("Deve criar um email inválido", function () {
  expect(() => new Email("joao@gmail")).toThrow(new Error("Invalid email"));
});