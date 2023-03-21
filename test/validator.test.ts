import { validate } from "../src/validator";

test.each(["407.302.170-27", "684.053.160-00", "746.971.314-01"])(
  "Deve testar um cpf válido",
  function (cpf) {
    const isValid = validate(cpf);
    expect(isValid).toBeTruthy();
  }
);

test.each(["406.302.170-27", "406.302.170"])(
  "Deve testar um cpf inválido",
  function (cpf) {
    const isValid = validate(cpf);
    expect(isValid).toBeFalsy();
  }
);

test.each([
  "111.111.111-11",
  "222.222.222-22",
  "333.333.333-33",
  "444.444.444-44",
  "555.555.555-55",
  "666.666.666-66",
  "777.777.777-77",
  "888.888.888-88",
  "999.999.999-99",
  "000.000.000-00",
])("Deve testar um cpf inválido com todos os dígitos iguais", function (cpf) {
  const isValid = validate(cpf);
  expect(isValid).toBeFalsy();
});
