import TokenGenerator from "../../src/domain/entity/TokenGenerator";
import User from "../../src/domain/entity/User";

test("Deve gerar o token do usário", async function () {
  const user = await User.create("joao@gmail.com", "abc123");
  const expiresIn = 1000000;
  const issueDate = new Date("2023-03-01T10:00:00");
  const tokenGenerator = new TokenGenerator("key");
  const token = tokenGenerator.generate(user, expiresIn, issueDate);
  expect(token).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjc3Njc1NjAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDB9.nPHGoaoMLLpmDS61-njfqX6G5ZvwT3Y5U71uOXGbRYY");
});

test("Deve validar o token do usário", async function () {
  const tokenGenerator = new TokenGenerator("key");
  const payload = tokenGenerator.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjc3Njc1NjAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDB9.nPHGoaoMLLpmDS61-njfqX6G5ZvwT3Y5U71uOXGbRYY");
  expect(payload).toBeDefined();
  expect(payload.email).toBe("joao@gmail.com");
});

test("Deve tentar validar o token inválido", async function () {
  const tokenGenerator = new TokenGenerator("key");
  expect(() => tokenGenerator.verify("eyJhbGciOiJIUzI1NiIsI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjc3Njc1NjAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDB9.nPHGoaoMLLpmDS61-njfqX6G5ZvwT3Y5U71uOXGbRYY").toThrow(new Error("invalid token")))
});