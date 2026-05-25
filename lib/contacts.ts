import { supabase } from "./supabase";
import { Contact, ContactFormData } from "@/types/contact";

export async function getContacts(): Promise<Contact[]> {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function searchContacts(query: string): Promise<Contact[]> {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .or(`name.ilike.%${query}%,phone.ilike.%${query}%`)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function addContact(formData: ContactFormData): Promise<Contact> {
  const { data, error } = await supabase
    .from("contacts")
    .insert([formData])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateContact(
  id: string,
  formData: ContactFormData
): Promise<Contact> {
  const { data, error } = await supabase
    .from("contacts")
    .update(formData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteContact(id: string): Promise<void> {
  const { error } = await supabase.from("contacts").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
