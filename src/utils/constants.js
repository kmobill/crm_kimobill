export const estilosCalendario = {
  div: {
    backgroundColor: "rgb(203 213 225)",
    outline: "none",
    borderRadius: 0,
    margin: 0,
    border: "none" /* 
    ":hover": { outline: "none", border: "none" },
    ":focus": { outline: "none", border: "none" },
    ":active": { outline: "none", border: "none" }, */,
  },
  label: {
    color: "#ffffff",
  },
  input: {
    margin: 0,
    padding: "2px",
    color: "#000000",
    backgroundColor: "rgb(203 213 225)",
  },
  button: {
    padding: 0,
    borderRadius: "1px",
    backgroundColor: "rgb(7,89,133,0.5)",
    ":hover": { backgroundColor: "rgb(7,89,133)" },
  },
  svg: {
    margin: 0,
    color: "#000000",
  },
};
export const textWarningLogin = {
  password: {
    pattern:
      "Debe contener al menos un número, letra Mayúscula, letra minúscula y ser mayor a 8 caracteres",
  },
  email: {
    pattern: "El correo debe tener este formato: example@example.com",
  },
  general: {
    empty: "El campo no puede estar vacío",
  },
};
