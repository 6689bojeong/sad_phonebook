"use client";

import { useEffect, useState, useCallback } from "react";
import { Contact, ContactFormData } from "@/types/contact";
import {
  getContacts,
  searchContacts,
  addContact,
  updateContact,
  deleteContact,
} from "@/lib/contacts";
import ContactList from "@/components/ContactList";
import ContactForm from "@/components/ContactForm";
import DeleteDialog from "@/components/DeleteDialog";
import SearchBar from "@/components/SearchBar";

type Modal =
  | { type: "add" }
  | { type: "edit"; contact: Contact }
  | { type: "delete"; contact: Contact }
  | null;

export default function Page() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState<Modal>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (q: string) => {
    try {
      setError(null);
      const data = q.trim() ? await searchContacts(q) : await getContacts();
      setContacts(data);
    } catch (e) {
      setError("연락처를 불러오는 데 실패했습니다.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(query);
  }, [query, load]);

  async function handleAdd(data: ContactFormData) {
    await addContact(data);
    setModal(null);
    setLoading(true);
    await load(query);
  }

  async function handleEdit(data: ContactFormData) {
    if (modal?.type !== "edit") return;
    await updateContact(modal.contact.id, data);
    setModal(null);
    setLoading(true);
    await load(query);
  }

  async function handleDelete() {
    if (modal?.type !== "delete") return;
    await deleteContact(modal.contact.id);
    setModal(null);
    setLoading(true);
    await load(query);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">전화번호부</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {contacts.length}개의 연락처
            </p>
          </div>
          <button
            onClick={() => setModal({ type: "add" })}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            추가
          </button>
        </div>

        {/* 검색창 */}
        <div className="mb-4">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        {/* 연락처 목록 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-2">
          {loading ? (
            <div className="py-20 flex flex-col items-center gap-3 text-gray-400">
              <svg
                className="w-6 h-6 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              <p className="text-sm">불러오는 중...</p>
            </div>
          ) : error ? (
            <div className="py-20 flex flex-col items-center gap-3 text-red-400">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm">{error}</p>
              <button
                onClick={() => load(query)}
                className="text-xs text-blue-500 underline"
              >
                다시 시도
              </button>
            </div>
          ) : (
            <ContactList
              contacts={contacts}
              onEdit={(c) => setModal({ type: "edit", contact: c })}
              onDelete={(c) => setModal({ type: "delete", contact: c })}
            />
          )}
        </div>
      </div>

      {/* 모달 */}
      {modal?.type === "add" && (
        <ContactForm onSubmit={handleAdd} onCancel={() => setModal(null)} />
      )}
      {modal?.type === "edit" && (
        <ContactForm
          initial={modal.contact}
          onSubmit={handleEdit}
          onCancel={() => setModal(null)}
        />
      )}
      {modal?.type === "delete" && (
        <DeleteDialog
          name={modal.contact.name}
          onConfirm={handleDelete}
          onCancel={() => setModal(null)}
        />
      )}
    </main>
  );
}
