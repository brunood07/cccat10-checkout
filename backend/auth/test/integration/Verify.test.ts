import UserRepository from "../../src/application/repository/UserRepository";
import Login from "../../src/application/usecase/Login";
import Verify from "../../src/application/usecase/Verify";

test("Deve verificar um token", async function () {
  const verify = new Verify();
  const isValid = await verify.execute("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjc3Njc1NjAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDB9.nPHGoaoMLLpmDS61-njfqX6G5ZvwT3Y5U71uOXGbRYY");
  expect(isValid).toBeTruthy();
});