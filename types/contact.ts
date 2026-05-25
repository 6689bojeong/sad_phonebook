export type Contact = {
  id: string;
  name: string;
  phone: string;
  memo?: string;
  created_at: string;
};

export type ContactFormData = {
  name: string;
  phone: string;
  memo?: string;
};
