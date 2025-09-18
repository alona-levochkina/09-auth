import { CreateNoteData, Note } from "@/types/note";
import { FetchNotesParams, FetchNotesResponse } from "../api";
import api from "./api";
import type { AuthRequestData, User } from "@/types/user";

// --- User & Auth ---
export const signUp = (data: AuthRequestData) =>
  api.post("/auth/sign-up", data);
export const signIn = (data: AuthRequestData) =>
  api.post("/auth/sign-in", data);
export const signOut = () => api.post("/auth/sign-out");
export const refreshSession = () => api.get<User>("/auth/session");
export const updateUser = (data: Partial<User>) =>
  api.patch<User>("/users/me", data);

// --- Notes (for Client Components) ---
export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const { data } = await api.get("/notes", { params });
  return data;
};

export const createNote = (noteData: CreateNoteData) =>
  api.post<Note>("/notes", noteData);
export const deleteNote = (noteId: string) =>
  api.delete<Note>(`/notes/${noteId}`);
