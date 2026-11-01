
import { describe, expect, it } from "vitest";
import { validarFormulario } from "./validarFormulario";

describe("Validação do formulário de Marineford", () => {
  it("rejeita dados vazios", () => {
    const erros = validarFormulario({
      nome: "",
      email: "",
      mensagem: "",
    });

    expect(erros.nome).toBeDefined();
    expect(erros.email).toBeDefined();
    expect(erros.mensagem).toBeDefined();
  });

  it("rejeita e-mail inválido", () => {
    const erros = validarFormulario({
      nome: "Bruno",
      email: "email-invalido",
      mensagem: "Esta mensagem tem mais de vinte caracteres.",
    });

    expect(erros.email).toBeDefined();
  });

  it("rejeita mensagens muito curtas", () => {
    const erros = validarFormulario({
      nome: "Bruno",
      email: "teste@exemplo.com",
      mensagem: "Olá!",
    });

    expect(erros.mensagem).toBeDefined();
  });

  it("aceita dados válidos", () => {
    const erros = validarFormulario({
      nome: "Bruno",
      email: "teste@exemplo.com",
      mensagem: "Gostaria de conversar sobre um projeto de software.",
    });

    expect(erros).toEqual({});
  });
});
