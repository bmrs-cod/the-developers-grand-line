
// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import RotaProtegida from "./RotaProtegida";

const { mockGetUser } = vi.hoisted(() => ({
  mockGetUser: vi.fn(),
}));

vi.mock("../services/supabaseClient", () => ({
  supabase: {
    auth: {
      getUser: mockGetUser,
    },
  },
}));

function renderizarRota() {
  return render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <Routes>
        <Route path="/login" element={<h1>Página de Login</h1>} />

        <Route
          path="/dashboard"
          element={
            <RotaProtegida>
              <h1>Dashboard autorizado</h1>
            </RotaProtegida>
          }
        />
      </Routes>
    </MemoryRouter>
  );
}

describe("Proteção do dashboard", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("redireciona visitantes sem login", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: null },
      error: null,
    });

    renderizarRota();

    expect(
      screen.getByText("Verificando acesso ao Quartel-General...")
    ).toBeTruthy();

    expect(
      await screen.findByRole("heading", {
        name: "Página de Login",
      })
    ).toBeTruthy();

    expect(
      screen.queryByText("Dashboard autorizado")
    ).toBeNull();
  });

  it("permite o acesso de usuários autenticados", async () => {
    mockGetUser.mockResolvedValue({
      data: {
        user: {
          id: "usuario-teste",
          email: "teste@exemplo.com",
        },
      },
      error: null,
    });

    renderizarRota();

    expect(
      await screen.findByRole("heading", {
        name: "Dashboard autorizado",
      })
    ).toBeTruthy();

    expect(
      screen.queryByText("Página de Login")
    ).toBeNull();
  });
});
