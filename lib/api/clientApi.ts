import { CreateNoteData, Note } from "@/types/note";
import api from "./api";
import type { AuthRequestData, User } from "@/types/user";
import { FetchNotesParams, FetchNotesResponse } from "@/types/api";

// --- User & Auth ---
export const signUp = (data: AuthRequestData) =>
  api.post<User>("/auth/register", data).then((res) => res.data);

export const signIn = (data: AuthRequestData) =>
  api.post<User>("/auth/login", data).then((res) => res.data);

export const signOut = () => api.post("/auth/logout");

export const refreshSession = () => api.get("/auth/session");

export const getMe = () => api.get<User>("/users/me");

export const updateUser = (data: Partial<User>) =>
  api.patch<User>("/users/me", data);

// --- Notes (for Client Components) ---
export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const { data } = await api.get("/notes", { params });
  return data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${noteId}`);
  return data;
};

export const createNote = (noteData: CreateNoteData) =>
  api.post<Note>("/notes", noteData);

export const deleteNote = (noteId: string) =>
  api.delete<Note>(`/notes/${noteId}`);
