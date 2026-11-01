
import { supabase } from "./supabaseClient";

export async function buscarMensagens() {
  const { data, error } = await supabase
    .from("mensagens")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function marcarRespondida(id, respondida) {
  const { data, error } = await supabase
    .from("mensagens")
    .update({ respondida })
    .eq("id", id)
    .select();

  if (error) throw error;

  return data;
}
