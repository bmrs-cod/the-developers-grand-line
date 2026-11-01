
import { supabase } from "./supabaseClient";

export async function buscarDestaques() {
  const { data, error } = await supabase
    .from("projetos_destaque")
    .select("repositorio")
    .order("id", { ascending: true });

  if (error) throw error;

  return data.map((item) => item.repositorio);
}

export async function salvarDestaques(repositorios) {
  if (repositorios.length > 3) {
    throw new Error("Selecione no máximo 3 projetos.");
  }

  const { error } = await supabase.rpc("atualizar_destaques", {
    novos_repositorios: repositorios,
  });

  if (error) throw error;
}
